"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './styles.css';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostContext';
import { formatDateTime } from '@/commom/helper/date';

const UserProfile: React.FC = () => {
  const {myUser, getMyUser} = useAuth();
  const {myPosts,  getMyPosts} = usePosts();

  useEffect(() => {
    if(myPosts.length === 0){
      getMyPosts();
    }
    if(!myUser){
      getMyUser();
    }
  },[])

  const [usageData] = useState({
    postsMade: 34,
    likesReceived: 3455,
    postsSaved: 3455,
    joinedDate: '05/05/2024',
    lastLogin: '05/05/2024',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    // setUserData({
    //   ...userData,
    //   [name]: value,
    // });
  };

  const handleUpdate = (field: string) => {
    // Aqui você pode fazer a requisição para a API para atualizar o campo correspondente
    console.log(`Atualizando ${field}:`);

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
                  // placeholder={myUser?.name.split(' ')[0]}
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
            <p>Post feitos: {myPosts.length}</p>
            <p>Likes recebidos: {myPosts.reduce((acc,post)=>acc+post.likes.length,0)}</p>
            <p>Posts salvos: {myPosts.reduce((acc,post)=>acc+post.saveds.length,0)}</p>
            <p>Data que entrou na plataforma: {formatDateTime(myUser?.created_at)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
