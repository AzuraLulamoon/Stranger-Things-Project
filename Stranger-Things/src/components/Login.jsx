
//imports
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

//main function
function Login() {
//setstates for login info + navigation variable  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');
  const navigate = useNavigate();

  //async event to handle our main fetch request
  const handleSubmit = async (event) => {
    //gotta prevent those defaults
    event.preventDefault();
    setIsError(false);

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
        const newToken = result.data.token

        console.log(result.data.message)

        console.log(newToken);

        localStorage.setItem('token', newToken )
        
        navigate('/Profile');

        window.location.reload();

        // Error message logic
        if (result.error) {
            setIsError(true);
        }
        
        console.log(result);
        return result
    
    } catch(error) {
        console.log(error)
    }
    // user Info
    console.log('Username:', username);
    console.log('Password:', password);
  
};
 console.log(isError)
  return (
    <div>
      <h1>Login</h1>
      {isError ? <p>Your username or password is incorrect</p>:null}
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