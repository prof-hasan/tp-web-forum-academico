"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import NewPostModal from '../../components/NewPostModal';
import { PostProps } from '../../commom/interfaces/postProps';
import './styles.css';
import { NewPostModalProps } from '@/commom/interfaces/newPostModal';
import Post from '../../components/Post';

const MyPosts: React.FC = () => {
  
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [posts, setPosts] = useState<PostProps[]>([
    {
      author: 'Zalter',
      date: '04 feb 2024',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      likes: 20,
      comments: 17,
    },
    // Adicione mais posts aqui
  ]);

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNewPost = (content: string) => {
    const newPost: PostProps = {
      author: 'Zalter', 
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      content,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
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
            author={post.author}
            date={post.date}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
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
