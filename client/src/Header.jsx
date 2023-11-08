// Header.jsx
import React, { useState } from 'react';
import './styles/Header.css';

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className={isHovered ? 'hide' : ''}>Welcome to PartyMaster</h1>
      <h1 className={isHovered ? '' : 'hide'}>Your go-to for planning and managing social events.</h1>
    </header>
  );
}

export default Header;
