import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                }
            })
        })
        const result = await response.json();
        console.log(result);
        return result
    } catch(error) {
        setErrorMessage(' Your username and or password is inccorect ');
    }
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1>Login</h1>
      <p>{errorMessage.message}</p>
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