import React from 'react';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import { PostProps } from '../../commom/interfaces/postProps';
import './styles.css';

const LatestPosts: React.FC = () => {
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

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h1>Meus posts</h1>
        {posts.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            date={post.date}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
        <div className="floating-action-button">+</div>
      </main>
    </div>
  );
}

export default LatestPosts;
