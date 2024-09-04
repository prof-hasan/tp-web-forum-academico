"use client";

import React from 'react';
import './sidebarStyles.css';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="sidebar">
      <img src="/logo.svg" alt="logo" className='logo' />
      <div className="icons">
        <button 
          className="icon" 
          onClick={() => handleNavigation('/latestPosts')}
        >
          ☁️
        </button>
        <button 
          className="icon" 
          onClick={() => handleNavigation('/myPosts')}
        >
          📁
        </button>
        <button 
          className="icon" 
          onClick={() => handleNavigation('/userProfile')}
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
