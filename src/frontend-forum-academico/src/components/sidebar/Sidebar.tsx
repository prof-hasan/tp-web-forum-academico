"use client";

import React from 'react';
import './sidebarStyles.css';
import { useRouter } from 'next/navigation';
import { useSideBar } from '@/context/SidebarContext';

const Sidebar: React.FC = () => {
  const { tabIndex, changeTab } = useSideBar();
  
  const router = useRouter();

  const handleNavigation = (path: string, index:number) => {
    router.push(path);
    changeTab(index);
  };

  return (
    <div className="sidebar">
      <img src="/logo.svg" alt="logo" className='logo' />
      <div className="icons">
        <button 
          className={`icon ${tabIndex === 0 ? 'selected' : ''}` }
          onClick={() => handleNavigation('/latestPosts',0)}
        >
          ☁️
        </button>
        <button 
          className={`icon ${tabIndex === 1 ? 'selected' : ''}` }
          onClick={() => handleNavigation('/myPosts',1)}
        >
          📁
        </button>
        <button 
          className={`icon ${tabIndex === 2 ? 'selected' : ''}` }
          onClick={() => handleNavigation('/userProfile',2)}
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
