import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Create the Login component
function Login() {
  // State to hold the input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can implement your login logic here
    // For simplicity, we will just log the username and password
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
        <div>
            <Link to='/NewAccount'>Dont have an account? Create one here!</Link>
        </div>
    </div>
  );
}

export default Login;