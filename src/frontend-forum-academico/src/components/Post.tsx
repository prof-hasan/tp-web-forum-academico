import React from 'react';
import './postStyles.css';
import { PostProps } from '../commom/interfaces/postProps';

const Post: React.FC<PostProps> = ({ author, date, content, likes, comments })=>{
  function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    };

    const formattedDate = date.toLocaleDateString('pt-BR', options);

    return `${formattedDate}`;
}

  return (
    <div className="post">
      <div className="header">
        <span className="author">{author}</span>
        <span className="date">{formatDateTime(date)}</span>
      </div>
      <div className="content">{content}</div>
      <div className="footer">
        <span className="likes">👍 {likes}</span>
        <span className="comments">💾 {comments}</span>
      </div>
    </div>
  );
}


export default Post;
