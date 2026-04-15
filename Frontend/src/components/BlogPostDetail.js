import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from './Blog'; // Adjust the import path as necessary

const BlogPostDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="md:text-3xl md:text-center md:py-3 text-xl font-bold mb-4">{post.title}</h1>
      <img src={post.banner} alt={post.title} className="w-full h-auto object-cover" />
      <p className="font-bold py-2">{post.date} by {post.author}</p>
      <div className="mt-3 text-justify">
        <p className="text-gray-800 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default BlogPostDetail;