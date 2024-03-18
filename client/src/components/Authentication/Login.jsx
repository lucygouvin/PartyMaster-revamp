import { useState } from 'react';
import '../../styles/Login.css';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

export function Login(props) {
  const [formState, setFormState] = useState({ email: '', password:''});
  const [login, {error, data}] = useMutation(LOGIN);

  const handleChange = (event) =>{
    const {name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    try{
      const { data }= await login({
        variables: {...formState },
      });

      Auth.login(data.login.token);
      
      window.location.href="/dashboard";
    } catch(e) {
      console.error(e);
    }

    setFormState({
      email:'',
      password:'',
    });
  };
  return (
    <div className="landing-page full-page">
      <main className="main-content">
        <div className="login-container">
          <form className="login-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email-login" className="form-label">Email address</label>
              <input type="email" className="form-control styling-exclude" id="email-login" placeholder="Your Email" required
              name="email"
              value= {formState.email}
              onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password-login" className="form-label">Password</label>
              <input type="password" className="form-control styling-exclude" id="password-login" placeholder="" required 
              name="password"
              value={formState.password}
              onChange={handleChange}
              />
            </div>
            <button type="submit" className="signin-button cta-button">Sign In</button>
            <a href="/signup" id="sign-up-redirect" className="signup-button-two primary-button">Create New Account</a>
          </form>
        </div>
      </main>
    </div >
  );
};

export default Login;
