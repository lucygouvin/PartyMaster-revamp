import React, { useState, useEffect } from 'react';
import '../../styles/Signup.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export function Signup(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [addUser, { error }] = useMutation(ADD_USER);
    const [errorMessage, setErrorMessage] = useState('')




    const handleFormSubmit = async(event)=>{
        event.preventDefault();
         if(password !== confirmPassword){
        
            setErrorMessage("Your password must match confirm password")
                console.error(errorMessage)
                window.location.assign("/signup")
    
        }
        try {
            const { data } = await addUser({
                variables: { email, name, password, login:true, },
            });
            Auth.login(data.addUser.token)

     
                window.location.href="/dashboard";
            
         
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="landing-page full-page">
            <main className="main-content">
                <div className="signup-container">
                    <form className="signup-form" 
                    onSubmit = {handleFormSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="username-signup" className="form-label">Username</label>
                            <input type="text" id="username-signup" className="form-control styling-exclude" required 
                            
                            value = {name}
                            onChange={(event) =>setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-signup" className="form-label">Email Address</label>
                            <input type="email" id="email-signup" className="form-control styling-exclude" required 
                             
                             value = {email}
                             onChange={(event) =>setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-signup" className="form-label">Password</label>
                            <input type="password" id="password-signup" className="form-control styling-exclude" required 
                             value = {password}
                             onChange={(event) =>setPassword(event.target.value)}
                            />
                            <p className='password-help'>Password must contain  a special character, a capital letter, a number, and be at least 8 characters long.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-signup" className="form-label">Confirm Password</label>
                            <input type="password" id="password-signup" className="form-control styling-exclude" required 
                             
                             value = {confirmPassword}
                             onChange={(event) =>setConfirmPassword(event.target.value)}
                            />
                        </div>
                        {
                            errorMessage && (
                                <div>
                                    <p>{errorMessage}</p>
                                </div>
                            )
                        }
                       <button className="signup-button cta-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </main>
        </div >
    );
};

export default Signup;
