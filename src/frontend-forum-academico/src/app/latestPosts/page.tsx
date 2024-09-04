"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { NewPost } from '../../commom/interfaces/postProps';
import './styles.css';
import { NewPostModalProps } from '@/commom/interfaces/newPostModal';
import Post from '../../components/post/Post';
import { usePosts } from '@/context/PostContext';
import NewPostModal from '@/components/newPostModal/NewPostModal';
import { useAuth } from '@/context/AuthContext';

const MyPosts: React.FC = () => {
    const { getPosts, posts, createPost } = usePosts();
    const { myUser, getMyUser } = useAuth();

    useEffect(() => {
      if(!myUser){
          getMyUser();
      }
    },[]);

    useEffect(() => {
      getPosts();
    }, [getPosts]);
  
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNewPost = async (title:string, body:string) => {
    const newPost: NewPost = {
      user_id: myUser?.id!, 
      title: title,
      text: body,
    };
    await createPost(newPost);
  };

  console.log(posts);

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
            _id={post._id}
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
