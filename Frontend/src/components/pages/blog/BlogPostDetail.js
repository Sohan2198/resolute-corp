import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'blogs', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post from Firebase:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E4669]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        Post not found.
      </div>
    );
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