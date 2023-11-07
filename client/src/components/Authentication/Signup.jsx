import React, { useState } from 'react';
import '../../styles/signup.css';

export function Signup(props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="landing-page">
            <header className="landing-header"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h1 className={isHovered ? 'hide' : ''}>Welcome to PartyMaster</h1>
                <h1 className={isHovered ? '' : 'hide'}>Your go-to for planning and managing social events.</h1>
            </header>

            <main className="main-content">
                <div className="signup-container">
                    <form className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username-signup" className="form-label">Username:</label>
                            <input type="text" id="username-signup" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-signup" className="form-label">Email address</label>
                            <input type="email" id="email-signup" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-signup" className="form-label">Password</label>
                            <input type="password" id="password-signup" className="form-control" required />
                        </div>
                        <a href="/login" className="signup-button">Sign Up</a>
                    </form>
                </div>
            </main>

            <footer className="landing-footer">
                <p>&copy; 2023 PartyMaster</p>
            </footer>
        </div >
    );
};

export default Signup;
