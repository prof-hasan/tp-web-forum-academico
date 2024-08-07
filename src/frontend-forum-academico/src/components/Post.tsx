import React from 'react';
import './postStyles.css';
import { PostProps } from '../commom/interfaces/postProps';

const Post: React.FC<PostProps> = ({ author, date, content, likes, comments }) => (
  <div className="post">
    <div className="header">
      <span className="author">{author}</span>
      <span className="date">{date}</span>
    </div>
    <div className="content">{content}</div>
    <div className="footer">
      <span className="likes">👍 {likes}</span>
      <span className="comments">💾 {comments}</span>
    </div>
  </div>
);

export default Post;
