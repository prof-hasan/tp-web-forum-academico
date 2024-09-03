'use client'

import React, { useState } from 'react';
import './styles.css';

const Register: React.FC = () => {

    const initialState = {
        fullName: '',
        email: '',
        bio: '',
        customLink: '',
    }

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Aqui você pode enviar os dados para uma API
    };

    return (
        <div className="register-container">
        <img src="/logo.svg" alt="logo" className="logo" />
        <h1>Faça Cadastro Na Plataforma</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="fullName">Nome Completo</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="bio">Descrição</label>
            <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="customLink">Link Customizável</label>
            <input
                type="text"
                id="customLink"
                name="customLink"
                value={formData.customLink}
                onChange={handleChange}
            />
            </div>
            <div className="form-actions">
                <button type="submit" className="save-button">SAVE</button>
                <button type="button" className="cancel-button" onClick={() => { setFormData(initialState) }}>CANCEL</button>
            </div>
        </form>
        </div>
    );
};

export default Register;
