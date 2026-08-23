import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet';
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg';
import { blogPosts as initialBlogPosts } from '../../../data/blogData';

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${post.slug}`); // Redirect to the blog post detail page
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-10 flex flex-col h-full">
      <div className="relative">
        <img src={post.banner} alt={post.title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h2 className="md:text-xl text-sm font-semibold mb-2 line-clamp-2">{post.title}</h2>
          <span className="text-sm">{post.date}</span>
          <span className="text-sm ml-4">{post.author}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
        <button 
          onClick={handleReadMore} 
          className="text-[#0E4669] font-medium flex items-center hover:text-blue-600 mt-auto"
        >
          Read More <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    // Load custom/edited posts from localStorage
    const localPosts = localStorage.getItem('resolute_blog_posts');
    if (localPosts) {
      try {
        const parsed = JSON.parse(localPosts);
        setBlogPosts(parsed);
      } catch (e) {
        console.error("Error parsing local posts", e);
      }
    }
  }, []);

  const categories = [...new Set(blogPosts.map(post => post.category))];

  const filteredBlogPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center my-6 gap-2 px-4">
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
      </div>
    </section>
  );
};

export default Blog;