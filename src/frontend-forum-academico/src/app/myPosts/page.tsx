'use client';

import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Post from '../../components/post/Post';
import './styles.css';
import { usePosts } from '@/context/PostContext';

const MyPosts: React.FC = () => {
  const {getMyPosts, myPosts} = usePosts();

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  console.log(myPosts);

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h1>Meus posts</h1>
        {myPosts.map((post, index) => (
          <Post
            key={index}
            author={`${post.user_name} ${post.title}`}
            date={post.created_at}
            content={post.text}
            likes={post.likes.length}
            comments={post.saveds.length}
          />
        ))}
      </main>
    </div>
  );
}

export default MyPosts;
