"use client";

import React from 'react';
import './sidebarStyles.css';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  
  const router = useRouter();
  const currentRoute = usePathname(); // Obtém a rota atual
  console.log(currentRoute)

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="sidebar">
      <img src="/logo.svg" alt="logo" className='logo' />
      <div className="icons">
        <button 
          className={`icon${currentRoute === '/cloud' ? '.active' : ''}`} 
          onClick={() => handleNavigation('/cloud')}
        >
          ☁️
        </button>
        <button 
          className={`icon${currentRoute === '/files' ? '.active' : ''}`} 
          onClick={() => handleNavigation('/files')}
        >
          📁
        </button>
        <button 
          className={`icon${currentRoute === '/profile' ? '.active' : ''}`} 
          onClick={() => handleNavigation('/profile')}
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
