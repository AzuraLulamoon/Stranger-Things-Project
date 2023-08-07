
//imports
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

//main function
export default function Login() {
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
        //URL post stuff
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
        //log all the things
        console.log(result.data.message)
        console.log(newToken);
        //storing that shiny token in local storage for later use, honestly faster and cleaner than moving the token around with useState
        localStorage.setItem('token', newToken )
        //navigation link, puts you on your profile page after login
        navigate('/Profile');
        //this exsists to fix a bug with certain conditional rendering errors i ran into
        window.location.reload();
        console.log(result);
        return result
    //error logic
    } catch(error) {
        console.log(error)
        setIsError(true)
    }
    // user Info logs
    console.log('Username:', username);
    console.log('Password:', password);
  
};
  return (
    <div className='loginPage'>
      <h1 id='loginTitle'>Login</h1>
      {isError ? <p>Your username or password is incorrect</p>:null}
      <form onSubmit={handleSubmit} className='loginFormContent'>
        <div className='loginField'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='passwordField'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id='loginButton'>Login</button>
      </form>
        <div id='newAccountLink'>
            <Link to='/NewAccount'>Dont have an account? Create one here!</Link>
        </div>
    </div>
  );
}
