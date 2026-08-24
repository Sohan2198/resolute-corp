import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAdmin } from '../../../contexts/AdminContext';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import htmlEditButton from 'quill-html-edit-button';

// Allow pasting images as base64 inside editor content
const ImageBlot = Quill.import('formats/image');
ImageBlot.sanitize = (url) => url; // allow base64 and http urls
Quill.register(ImageBlot, true);
Quill.register('modules/htmlEditButton', htmlEditButton);

// Quill has no native table format, so pasted <table> markup gets stripped by
// its HTML-to-Delta converter. Preserve it verbatim as a raw HTML embed instead.
const BlockEmbed = Quill.import('blots/block/embed');
class RawHtmlBlot extends BlockEmbed {
  static create(html) {
    const node = super.create();
    node.innerHTML = html;
    return node;
  }
  static value(node) {
    return node.innerHTML;
  }
}
RawHtmlBlot.blotName = 'rawHtml';
RawHtmlBlot.tagName = 'div';
RawHtmlBlot.className = 'ql-raw-html';
Quill.register(RawHtmlBlot);

// Pasted tables (Word/Excel/Sheets/a webpage) carry their own inline styles and
// attributes. Rebuild every table with this fixed look instead of preserving
// whatever the source used, so tables are visually consistent across posts.
const TABLE_CELL_STYLE = {
  th: 'border: 1px solid #000; padding: 10px; text-align: left;',
  td: 'border: 1px solid #000; padding: 10px;',
};

const normalizeTableHtml = (tableNode) => {
  const rowsHtml = Array.from(tableNode.querySelectorAll('tr')).map(tr => {
    const cellsHtml = Array.from(tr.children)
      .filter(cell => cell.tagName === 'TH' || cell.tagName === 'TD')
      .map(cell => {
        const tag = cell.tagName.toLowerCase();
        const colspan = cell.hasAttribute('colspan') ? ` colspan="${cell.getAttribute('colspan')}"` : '';
        const rowspan = cell.hasAttribute('rowspan') ? ` rowspan="${cell.getAttribute('rowspan')}"` : '';
        return `<${tag} style="${TABLE_CELL_STYLE[tag]}"${colspan}${rowspan}>${cell.innerHTML}</${tag}>`;
      })
      .join('');
    return `<tr>${cellsHtml}</tr>`;
  }).join('');
  return `<table style="border-collapse: collapse; width: 100%;"><tbody>${rowsHtml}</tbody></table>`;
};

// Shared by the banner upload input and the editor's image-paste handler.
const resizeImageFile = (file, maxWidth = 1200, quality = 0.8) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/webp', quality));
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});


const BlogManager = () => {
  const { logout, isLoggedIn, authLoading } = useAdmin();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  
  // UI States
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomAuthor, setIsCustomAuthor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Computed options
  const uniqueCategories = [...new Set(posts.map(p => p.category))].filter(Boolean);
  const uniqueAuthors = [...new Set(posts.map(p => p.author))].filter(Boolean);

  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    author: '',
    date: '',
    category: '',
    banner: '',
    excerpt: '',
    content: ''
  });

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const firestorePosts = [];
        querySnapshot.forEach((doc) => {
          firestorePosts.push(doc.data());
        });
        setPosts(firestorePosts);
      } catch (error) {
        console.error('Error fetching from Firebase', error);
      }
    };
    
    fetchPosts();
  }, [authLoading, isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Create new - check if slug exists
    if (!editingPost && posts.some(p => p.slug === formData.slug)) {
      alert("A post with this slug already exists. Please choose a unique slug.");
      return;
    }

    try {
      // Save to Firebase using slug as document ID
      await setDoc(doc(db, "blogs", formData.slug), formData);
      
      let updatedPosts;
      if (editingPost) {
        updatedPosts = posts.map(p => p.slug === formData.slug ? formData : p);
      } else {
        updatedPosts = [formData, ...posts];
      }
      
      // Sort
      updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setPosts(updatedPosts);
      setEditingPost(null);
      resetForm();
      alert("Post saved successfully to database!");
    } catch (e) {
      console.error("Firebase save error:", e);
      alert("An error occurred while saving to database. Check console.");
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Try deleting from firebase
        await deleteDoc(doc(db, "blogs", slug));
        const updatedPosts = posts.filter(p => p.slug !== slug);
        setPosts(updatedPosts);
      } catch(e) {
        console.error("Delete error", e);
        // If it fails, maybe it's a hardcoded post that doesn't exist in DB
        const updatedPosts = posts.filter(p => p.slug !== slug);
        setPosts(updatedPosts);
        alert("Post removed from view (if it was a hardcoded post, it will reappear on refresh).");
      }
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setFormData(post);
    setIsCustomCategory(false);
    setIsCustomAuthor(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingPost(null);
    setIsCustomCategory(false);
    setIsCustomAuthor(false);
    setFormData({
      slug: '',
      title: '',
      author: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: '',
      banner: '',
      excerpt: '',
      content: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updates = { [name]: value };
      
      // Auto-generate slug from title if creating a new post
      if (name === 'title' && !editingPost) {
        updates.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
          .replace(/^-+|-+$/g, '');    // Trim hyphens from start and end
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleContentChange = (content) => {
    // Generate excerpt by stripping HTML and taking first ~200 chars
    // Replace block elements with space so words don't merge, then strip HTML
    let plainText = content.replace(/<(p|div|h[1-6]|li|blockquote)[^>]*>/gi, ' ');
    plainText = plainText.replace(/<[^>]+>/g, '');
    plainText = plainText.replace(/\s+/g, ' ').trim();
    
    const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;

    setFormData(prev => ({ ...prev, content, excerpt }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    resizeImageFile(file).then(dataUrl => setFormData(prev => ({ ...prev, banner: dataUrl })));
  };

  const quillRef = useRef(null);

  // Quill has no native table format, so a pasted <table> (from Word/Excel/Sheets/a
  // webpage) gets flattened line-by-line by its default matchers, which also breaks
  // pasting a table alongside other content in the same clipboard payload (e.g. an
  // image pasted right after it). Rebuild it with the standard table style and
  // preserve it via the raw-html blot.
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    quill.clipboard.addMatcher('table', (node) => {
      const Delta = Quill.import('delta');
      return new Delta().insert({ rawHtml: normalizeTableHtml(node) });
    });
  }, []);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    htmlEditButton: {
      debug: false,
      msg: 'Edit HTML directly',
      okText: 'Save',
      cancelText: 'Cancel',
      buttonHTML: '&lt;/&gt;',
      buttonTitle: 'Show HTML source',
      syntax: false,
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'rawHtml',
  ];

  // Date Helpers
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const formatDateForStorage = (dateStringYMD) => {
    if (!dateStringYMD) return '';
    const [year, month, day] = dateStringYMD.split('-');
    const localDate = new Date(year, month - 1, day);
    return localDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Filter & Sort Posts
  const filteredPosts = posts.filter(post => 
    (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedPosts = [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (authLoading || !isLoggedIn) return null;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col overflow-y-auto hidden md:flex shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/admin/dashboard/blog" className="block px-4 py-3 bg-[#0E4669] rounded-lg transition-colors text-white shadow-md">
            Blog Manager
          </Link>
          <Link to="/admin/dashboard/content" className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
            Content Manager
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Manager</h1>
          <Link to="/admin/dashboard" className="md:hidden text-[#0E4669] font-medium">Back to Dashboard</Link>
        </div>
        
        {/* Editor Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">
              {editingPost ? '✨ Edit Post' : '📝 Create New Post'}
            </h3>
            {editingPost && (
              <button 
                onClick={resetForm}
                className="text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input 
                      type="text" required name="title" value={formData.title} onChange={handleInputChange}
                      className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL endpoint)</label>
                    <input 
                      type="text" required name="slug" value={formData.slug} onChange={handleInputChange}
                      disabled={!!editingPost}
                      placeholder="Auto-generated from title"
                      className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border disabled:opacity-50 transition-all" 
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      {!isCustomAuthor ? (
                        <select
                          name="author"
                          required
                          value={formData.author}
                          onChange={(e) => {
                            if (e.target.value === 'CUSTOM_NEW_AUTHOR') {
                              setIsCustomAuthor(true);
                              setFormData(prev => ({ ...prev, author: '' }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all text-sm"
                        >
                          <option value="" disabled>Select Author</option>
                          {uniqueAuthors.map(author => <option key={author} value={author}>{author}</option>)}
                          <option value="CUSTOM_NEW_AUTHOR" className="font-bold text-[#0E4669]">+ Add New Author</option>
                        </select>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" required name="author" value={formData.author} onChange={handleInputChange}
                            placeholder="New Author Name"
                            className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all" 
                          />
                          <button 
                            type="button" 
                            onClick={() => { setIsCustomAuthor(false); setFormData(prev => ({...prev, author: ''})); }}
                            className="text-red-500 font-medium px-2 hover:text-red-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input 
                        type="date" required name="date" 
                        value={formatDateForInput(formData.date)} 
                        onChange={(e) => setFormData(prev => ({ ...prev, date: formatDateForStorage(e.target.value) }))}
                        className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    {!isCustomCategory ? (
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={(e) => {
                          if (e.target.value === 'CUSTOM_NEW_CATEGORY') {
                            setIsCustomCategory(true);
                            setFormData(prev => ({ ...prev, category: '' }));
                          } else {
                            handleInputChange(e);
                          }
                        }}
                        className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all text-sm"
                      >
                        <option value="" disabled>Select Category</option>
                        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        <option value="CUSTOM_NEW_CATEGORY" className="font-bold text-[#0E4669]">+ Add New Category</option>
                      </select>
                    ) : (
                      <div className="flex gap-2">
                        <input 
                          type="text" required name="category" value={formData.category} onChange={handleInputChange}
                          placeholder="New Category Name"
                          className="w-full border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all" 
                        />
                        <button 
                          type="button" 
                          onClick={() => { setIsCustomCategory(false); setFormData(prev => ({...prev, category: ''})); }}
                          className="text-red-500 font-medium px-2 hover:text-red-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image (Auto-converts to WebP)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors relative overflow-hidden group min-h-[220px]">
                      {formData.banner ? (
                        <>
                           <img src={formData.banner} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                           <div className="relative z-10 flex flex-col items-center mt-10">
                             <svg className="mx-auto h-12 w-12 text-[#0E4669]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                               <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                             <div className="flex text-sm text-gray-800 font-bold bg-white/80 px-3 py-1 rounded-full mt-2">
                               <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#0E4669] hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0E4669]">
                                 <span>Change image</span>
                                 <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                               </label>
                             </div>
                           </div>
                        </>
                      ) : (
                        <div className="space-y-1 text-center mt-6">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#0E4669] hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0E4669]">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pb-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content (Rich Text)</label>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#0E4669] focus-within:border-transparent transition-all">
                  <ReactQuill 
                    ref={quillRef}
                    theme="snow" 
                    value={formData.content} 
                    onChange={handleContentChange} 
                    modules={quillModules}
                    formats={quillFormats}
                    className="h-[500px] flex flex-col border-none [&_.ql-container]:flex-grow [&_.ql-container]:overflow-y-auto [&_.ql-toolbar]:shrink-0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">The excerpt is automatically generated from the first few lines of content.</p>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <button 
                  type="submit" 
                  className="bg-[#0E4669] hover:bg-[#0c3954] text-white font-medium py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-semibold text-gray-800">Published Posts</h3>
            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#0E4669] focus:border-transparent bg-gray-50 border transition-all text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-4 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="py-4 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="py-4 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedPosts.map(post => (
                  <tr key={post.slug} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="py-5 px-8 text-sm font-medium text-gray-900 max-w-xs truncate">{post.title}</td>
                    <td className="py-5 px-8 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-sm text-gray-500">{post.date}</td>
                    <td className="py-5 px-8 text-sm text-right space-x-4">
                      <button 
                        onClick={() => editPost(post)}
                        className="text-[#0E4669] hover:text-blue-700 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedPosts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">No posts found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
