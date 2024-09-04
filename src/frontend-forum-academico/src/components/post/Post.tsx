import React from 'react';
import './postStyles.css';
import { PostProps } from '../../commom/interfaces/postProps';
import { formatDateTime } from '@/commom/helper/date';
import { usePosts } from '@/context/PostContext';

const Post: React.FC<PostProps> = ({ _id ,author, date, content, likes, comments })=>{

  const {likePost} = usePosts();
  
  return (
    <div className="post">
      <div className="header">
        <span className="author">{author}</span>
        <span className="date">{formatDateTime(date)}</span>
      </div>
      <div className="content">{content}</div>
      <div className="footer">
        <span className="likes" onClick={()=>likePost(_id)}>👍 {likes}</span>
        <span className="comments">💾 {comments}</span>
      </div>
    </div>
  );
}


export default Post;
