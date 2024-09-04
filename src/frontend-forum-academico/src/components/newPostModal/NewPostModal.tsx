"use client";

import React, { useEffect, useState } from 'react';
import './newPostModalStyles.css';
import { NewPostModalProps } from '@/commom/interfaces/newPostModal';
import { useAuth } from '@/context/AuthContext';

interface PostContent{
    body:string,
    title:string,
}

const NewPostModal: React.FC<NewPostModalProps> = ({ onClose, onPost }) => {
    const {myUser, getMyUser} = useAuth(); 

    useEffect(() => {
        if(!myUser){
            getMyUser();
        }
    },[]);

    const [newPostContent, setNewPostContent] = useState<PostContent>({body:'',title:''});

    const handlePublish = () => {
        onPost(newPostContent.title,newPostContent.body);
        setNewPostContent({"body":'',"title":''});  
        onClose(); 
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPostContent({...newPostContent, title: e.target.value});
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostContent({...newPostContent, body: e.target.value});
    }

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
            <span>Novo Post</span>
            <button onClick={onClose}>X</button>
            </div>
            <div className="modal-content">
            <div className="post-header">
                <div className="author">Autor: {myUser?.name}</div>
            </div>
            <input 
                type="text" 
                placeholder="Seu titulo"
                onChange={handleTitleChange}
                className="input"
            />
            <textarea 
                placeholder="Corpo do post"
                onChange={handleTextChange}
                className="input"
            />
            <button className="publish-button" onClick={handlePublish}>PUBLICAR</button>
            </div>
        </div>
        </div>
    );
}

export default NewPostModal;
