"use client";

import React, { useState } from 'react';
import './newPostModalStyles.css';
import { NewPostModalProps } from '../commom/interfaces/newPostModal';

const NewPostModal: React.FC<NewPostModalProps> = ({ onClose, onPost }) => {
    const [newPostContent, setNewPostContent] = useState('');

    const handlePublish = () => {
        onPost(newPostContent); // Chama o callback com o conteúdo do post
        setNewPostContent('');  // Limpa o campo de texto
        onClose();  // Fecha o modal
    };

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
            <span>Novo Post</span>
            <button onClick={onClose}>X</button>
            </div>
            <div className="modal-content">
            <div className="post-header">
                <div className="author">Zalter</div>
            </div>
            <input 
                type="text" 
                placeholder="Começar publicação"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="input"
            />
            <button className="publish-button" onClick={handlePublish}>PUBLICAR</button>
            </div>
        </div>
        </div>
    );
}

export default NewPostModal;
