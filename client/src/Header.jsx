import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import Auth from "../src/utils/auth";

function Header() {
  // const [isHovered, setIsHovered] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
  // const dropdownRef = useRef(null);


  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };


  // const closeDropdown = () => {
  //   setShowDropdown(false);
  // };

  // // Function to handle user logout
  // const handleLogout = () => {

  //   setIsLoggedIn(false);
  //   closeDropdown();
  // };


  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       closeDropdown();
  //     }
  //   };


  //   if (showDropdown) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [showDropdown]);

  return (
    <header className="header">
      <h1>PartyMaster</h1>
      <div className='header-button-group'>
        <button className='button dashboard-button'>Dashboard</button>
        <button className='button create-button'>Create Event</button>
      </div>
    </header>
  );
}

export default Header;
