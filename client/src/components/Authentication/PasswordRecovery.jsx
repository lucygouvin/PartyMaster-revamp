import React, { useState } from 'react';
import './PasswordRecovery.css'; // Make sure this path is correct.

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement password recovery logic here by calling an API endpoint to handle the password recovery process.
    console.log('Password recovery email sent to:', email);
  };

  return (
    <div className="password-recovery-container">
      <form className="password-recovery-form" onSubmit={handleSubmit}>
        <h2>Password Recovery</h2>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
