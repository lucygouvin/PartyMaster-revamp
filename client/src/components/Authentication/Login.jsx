import React, { useState } from 'react';
import '../../styles/Login.css';

export function Login(props) {
  return (
    <div className="landing-page">
      <main className="main-content">
        <div className="login-container">
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email-login" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email-login" required />
            </div>
            <div className="form-group">
              <label htmlFor="password-login" className="form-label">Password</label>
              <input type="password" className="form-control" id="password-login" required />
            </div>
            <button type="/Dashboard" className="signin-button">Sign In</button>
            <a href="/signup" className="signup-button">Create New Account</a>
          </form>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2023 PartyMaster</p>
      </footer>
    </div >
  );
};

export default Login;
