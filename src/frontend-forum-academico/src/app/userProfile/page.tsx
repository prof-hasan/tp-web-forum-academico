"use client";

import React, { use, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './styles.css';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostContext';
import { formatDateTime } from '@/commom/helper/date';
import { UserKeys } from '@/commom/interfaces/user';

const UserProfile: React.FC = () => {
  const {myUser, getMyUser, updateUserData} = useAuth();
  const {myPosts,  getMyPosts} = usePosts();
  const [userData, setUserData] = useState({...myUser});

  useEffect(() => {
    setUserData({...myUser})
  }, [myUser]);

  useEffect(() => {
    if(myPosts.length === 0){
      getMyPosts();
    }
    if(!myUser){
      getMyUser();
    }
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (field: UserKeys) => {
    updateUserData(field, userData[field]!);
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
                  name="name"
                  value={userData?.name}
                  onChange={handleChange}
                />
                <button type="button" onClick={() => handleUpdate('name')}>
                  ATUALIZAR
                </button>
              </div>
              <div className="form-group">
                <label>Email address *</label>
                <input
                  type="email"
                  name="email"
                  value={userData?.email}
                  onChange={handleChange}
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
                  value={userData?.password}
                  onChange={handleChange}
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
