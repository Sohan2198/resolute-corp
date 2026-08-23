import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts as initialBlogPosts } from '../../../data/blogData';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const firestorePosts = [];
        querySnapshot.forEach((doc) => {
          firestorePosts.push(doc.data());
        });
        
        // Merge with initialBlogPosts, preferring firestorePosts for duplicates based on slug
        const merged = [...firestorePosts];
        initialBlogPosts.forEach(initial => {
          if (!merged.find(p => p.slug === initial.slug)) {
            merged.push(initial);
          }
        });
        
        setBlogPosts(merged);
      } catch (error) {
        console.error("Error fetching from Firebase", error);
        setBlogPosts(initialBlogPosts);
      }
    };
    
    fetchPosts();
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