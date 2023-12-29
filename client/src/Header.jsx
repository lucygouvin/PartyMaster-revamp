import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import Auth from "../src/utils/auth";

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Function to handle user logout
  const handleLogout = () => {

    setIsLoggedIn(false);
    closeDropdown();
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };


    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="menu-icon" onClick={toggleDropdown}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="header-text">
        <h1 className={isHovered ? 'hide' : ''}>Welcome to PartyMaster</h1>
        <h1 className={isHovered ? '' : 'hide'}>Your go-to for planning and managing social events.</h1>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown-content" ref={dropdownRef}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/dashboard" onClick={closeDropdown}>Dashboard</Link>
              <Link to="/create-event" onClick={closeDropdown}>Create Event</Link>
              <Link to="/about" onClick={closeDropdown}>About PartyMaster</Link>
              <Link onClick={Auth.logout}>Logout</Link>
            </>
          ) : (
            <>

              <Link to="/">Home</Link>
              <Link to="/login" onClick={closeDropdown}>Sign In</Link>
              <Link to="/signup" onClick={closeDropdown}>Sign Up</Link>
              <Link to="/about" onClick={closeDropdown}>About PartyMaster</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
