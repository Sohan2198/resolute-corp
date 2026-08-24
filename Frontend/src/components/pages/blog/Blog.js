import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { Helmet } from 'react-helmet';
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${post.slug}`); // Redirect to the blog post detail page
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-10 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden cursor-pointer" onClick={handleReadMore}>
        <img src={post.banner} alt={post.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>{post.date}</span>
          <span className="font-medium text-gray-700">{post.category}</span>
        </div>
        <h2 
          className="md:text-xl text-lg font-bold mb-3 line-clamp-2 text-[#0E4669] hover:text-blue-600 cursor-pointer" 
          onClick={handleReadMore}
        >
          {post.title}
        </h2>
        <div className="flex-grow mb-4">
          <p className="text-gray-600 line-clamp-3 text-justify">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-800">{post.author}</span>
          <button 
            onClick={handleReadMore} 
            className="text-[#0E4669] font-medium flex items-center hover:text-blue-600"
          >
            Read More <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blogs from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = [...new Set(blogPosts.map(post => post.category))];

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      post.title?.toLowerCase().includes(searchLower) || 
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  const sortedBlogPosts = [...filteredBlogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedBlogPosts.length / postsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 on category change
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#F4F5F6]">
      <Helmet>
        <title>ResoluteCorp - Finance and Investment Centric Blog</title>
        <meta name="description" content="Explore insights on investments and growth with Resolute Group's expert analyses and strategies for navigating dynamic markets and achieving sustainable success." />
        <meta name="keywords" content="Investment blog, global investment firm, invest in global markets, investment firm, distinguished investment firm in India" />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div className="pb-10">
        <div className='bg-[#0E4669] text-white py-16 px-8 pt-6 h-410 md:p-6 lg:p-12'
          style={{
            backgroundImage: `url(${portfolioBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px'
          }}
        >
          <h1 className="text-4xl font-bold text-center mb-3 py-5">Blogs</h1>
          <h4 className='text-center text-xl mb-5 font-semibold'>Insights on Investments and Growth</h4>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E4669]"></div>
          </div>
        )}

        {/* Content — shown after load */}
        {!loading && (
          <>
            {/* Category Filter and Search */}
            <div className="container mx-auto px-4 my-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {['All', ...categories].map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-[#0E4669] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E4669] focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 min-h-[500px]">
              {currentPosts.length > 0 ? (
                currentPosts.map(post => (
                  <BlogPost key={post.slug} post={post} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No blog posts found for this category.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>

                <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded flex items-center justify-center transition-colors shrink-0 ${currentPage === i + 1 ? 'bg-[#0E4669] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;