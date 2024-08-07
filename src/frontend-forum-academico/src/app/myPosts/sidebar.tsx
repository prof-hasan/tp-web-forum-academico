// Sidebar.tsx

import React from 'react';
import './styles.css';

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <img src="/logo.svg" alt="logo" className='logo' />
    <div className="icons">
      <div className="icon">☁️</div>
      <div className="icon">📁</div>
      <div className="icon">👤</div>
    </div>
  </div>
);

export default Sidebar;
