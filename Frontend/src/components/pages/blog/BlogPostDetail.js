import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts as initialBlogPosts } from '../../../data/blogData';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  
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

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:py-12">
      <h1 className="md:text-4xl md:text-center md:py-6 text-2xl font-bold mb-6 text-[#0E4669]">{post.title}</h1>
      <img src={post.banner} alt={post.title} className="w-full max-h-[500px] object-cover rounded-lg shadow-md mb-8" />
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <p className="font-semibold text-gray-700">By {post.author}</p>
        <p className="text-gray-500">{post.date} • {post.category}</p>
      </div>
      <div className="mt-3 text-justify max-w-4xl mx-auto">
        <div 
          className="text-gray-800 text-lg leading-relaxed prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </div>
  );
};

export default BlogPostDetail;