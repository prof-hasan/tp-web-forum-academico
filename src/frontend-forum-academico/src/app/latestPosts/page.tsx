"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { PostProps } from '../../commom/interfaces/postProps';
import './styles.css';
import { NewPostModalProps } from '@/commom/interfaces/newPostModal';
import Post from '../../components/post/Post';
import { usePosts } from '@/context/PostContext';
import NewPostModal from '@/components/newPostModal/NewPostModal';

const MyPosts: React.FC = () => {
    const {getPosts, posts} = usePosts();

    useEffect(() => {
      getPosts();
    }, [getPosts]);
  
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNewPost = (content: string) => {
    const newPost: PostProps = {
      author: 'Zalter', 
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      content,
      likes: 0,
      comments: 0,
    };
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h1>Últimos posts</h1>
        <input
          type="text"
          placeholder="Palavra chave aqui"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        {filteredPosts.map((post, index) => (
          <Post
            key={index}
            author={`${post.user_name} ${post.title}`}
            date={post.created_at}
            content={post.text}
            likes={post.likes.length}
            comments={post.saveds.length}
          />
        ))}
        <div className="floating-action-button" onClick={() => setIsModalOpen(true)}>+</div>
        {isModalOpen && (
          <NewPostModal
            onClose={() => setIsModalOpen(false)}
            onPost={handleNewPost}
          />
        )}
      </main>
    </div>
  );
}

export default MyPosts;
