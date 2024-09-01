"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import { PostProps } from '../../commom/interfaces/postProps';
import './styles.css';

const MyPosts: React.FC = () => {
  
  const [filter, setFilter] = useState('');
  
  const posts: PostProps[] = [
    {
      author: 'Zalter',
      date: '04 feb 2024',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      likes: 20,
      comments: 17,
    },
    {
      author: 'Zalter',
      date: '04 feb 2024',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      likes: 20,
      comments: 17,
    },
    {
      author: 'Zalter',
      date: '04 feb 2024',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      likes: 20,
      comments: 17,
    },
    {
      author: 'Zalter',
      date: '04 feb 2024',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      likes: 20,
      comments: 17,
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(filter.toLowerCase())
  );

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
      </main>
    </div>
  );
}

export default MyPosts;
