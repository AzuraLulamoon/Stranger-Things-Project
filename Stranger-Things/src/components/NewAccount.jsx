import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

function CreateAccount() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
      try {
        const response = await fetch(`${BASE_URL}/users/register`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            user: {
              username: username,
              password: password,
            }
          })
        });
      
    
      const data = await response.json();
      console.log(data);
      // setToken(data.token);

      setUsername('')
      setPassword('')
      alert('Account created succesfully')
      navigate('/Login');
      } catch(err) {
        console.error(err)
      }
    console.log('Username:', username);
    console.log('Password:', password);
    
  }

  return (
    <div className="newAccountForm">
      <h1>Create a New Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="usernameField">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="passwordField">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="accountButton">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
