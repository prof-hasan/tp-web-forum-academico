"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles.css';
import { useAuth } from '@/context/AuthContext';

const UserProfile: React.FC = () => {
  const {myUser} = useAuth();


  const [usageData] = useState({
    postsMade: 34,
    likesReceived: 3455,
    postsSaved: 3455,
    joinedDate: '05/05/2024',
    lastLogin: '05/05/2024',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setUserData({
    //   ...userData,
    //   [name]: value,
    // });
  };

  const handleUpdate = (field: string) => {
    // Aqui você pode fazer a requisição para a API para atualizar o campo correspondente
    // console.log(`Atualizando ${field}:`, userData[field as keyof typeof userData]);
  };

  console.log(myUser);

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h1>Meus dados</h1>
        <div className="content">
          <div className="personal-info">
            <h2>Informações pessoais</h2>
            <form>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  name="firstName"
                  value={myUser?.name.split(' ')[0]}
                  onChange={handleChange}
                  placeholder={myUser?.name.split(' ')[0]}
                />
                <button type="button" onClick={() => handleUpdate('firstName')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Sobrenome</label>
                <input
                  type="text"
                  name="lastName"
                  value={myUser?.name.split(' ').slice(1).join(' ')}
                  onChange={handleChange}
                  placeholder={myUser?.name.split(' ').slice(1).join(' ')}
                />
                <button type="button" onClick={() => handleUpdate('lastName')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Email address *</label>
                <input
                  type="email"
                  name="email"
                  value={myUser?.email}
                  onChange={handleChange}
                  placeholder={myUser?.email}
                />
                <button type="button" onClick={() => handleUpdate('email')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  value={myUser?.password}
                  onChange={handleChange}
                  placeholder={myUser?.password}
                />
                <button type="button" onClick={() => handleUpdate('password')}>
                  ATUALIZAR
                </button>
              </div>
            </form>
          </div>
          <div className="usage-data">
            <h2>Dados de uso</h2>
            <p>Post feitos: {usageData.postsMade}</p>
            <p>Likes recebidos: {usageData.likesReceived}</p>
            <p>Posts salvos: {usageData.postsSaved}</p>
            <p>Data que entrou na plataforma: {usageData.joinedDate}</p>
            <p>Último login: {usageData.lastLogin}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
