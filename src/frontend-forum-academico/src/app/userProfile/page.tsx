"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bod@email',
    registrationNumber: '15879336',
    course: 'Engenharia de Computação',
    password: '123456',
  });

  const [usageData] = useState({
    postsMade: 34,
    likesReceived: 3455,
    postsSaved: 3455,
    joinedDate: '05/05/2024',
    lastLogin: '05/05/2024',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = (field: string) => {
    // Aqui você pode fazer a requisição para a API para atualizar o campo correspondente
    console.log(`Atualizando ${field}:`, userData[field as keyof typeof userData]);
  };

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
                  value={userData.firstName}
                  onChange={handleChange}
                  placeholder={userData.firstName}
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
                  value={userData.lastName}
                  onChange={handleChange}
                  placeholder={userData.lastName}
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
                  value={userData.email}
                  onChange={handleChange}
                  placeholder={userData.email}
                />
                <button type="button" onClick={() => handleUpdate('email')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Matrícula</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={userData.registrationNumber}
                  onChange={handleChange}
                  placeholder={userData.registrationNumber}
                />
                <button type="button" onClick={() => handleUpdate('registrationNumber')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Curso</label>
                <input
                  type="text"
                  name="course"
                  value={userData.course}
                  onChange={handleChange}
                  placeholder={userData.course}
                />
                <button type="button" onClick={() => handleUpdate('course')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder={userData.password}
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
