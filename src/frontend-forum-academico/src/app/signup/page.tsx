'use client'

import React, { use, useState } from 'react';
import './styles.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const router = useRouter();
    const  {createUser} = useAuth();

    const initialState = {
        fullName: '',
        email: '',
        password: '',
        checkPassword: '',
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
        if(formData.password === formData.checkPassword) {
            createUser(formData.fullName, formData.email, formData.password);
        }
    };

    const cancelHandle = () => {
        setFormData(initialState);
        router.push('/login');
    }

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
            <label htmlFor="password">Senha</label>
            <input
                type="hiden"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <label htmlFor="checkPassword">Repita a Senha</label>
            <input
                type="hiden"
                id="checkPassword"
                name="checkPassword"
                value={formData.checkPassword}
                onChange={handleChange}
            />
            </div>
            <div className="form-actions">
                <button type="submit" className="save-button">SAVE</button>
                <button type="button" className="cancel-button" onClick={cancelHandle}>CANCEL</button>
            </div>
        </form>
        </div>
    );
};

export default Register;