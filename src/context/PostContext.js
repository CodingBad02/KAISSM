import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load posts from localStorage on mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('scheduledPosts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    } catch (err) {
      console.error('Error loading posts from localStorage:', err);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('scheduledPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Function to add a new post
  const addPost = (newPost) => {
    const postWithId = { 
      ...newPost, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };
    setPosts([...posts, postWithId]);
  };

  // Function to update an existing post
  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? 
      { ...updatedPost, updatedAt: new Date().toISOString() } : post));
  };

  // Function to delete a post
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider; 