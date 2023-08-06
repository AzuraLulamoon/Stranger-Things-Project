import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Profile() {

    const [user, setUser] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        
        setUser(null);
        localStorage.removeItem('token');
        navigate('/Login');
    }
    
    useEffect(() => {
    if (token) {
        fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const response = 
        .then((userData) => {
            setUser(userData);
        })
        .catch((error) => {
            console.error(error);
        })
      }
    
    }, []);

    console.log(user)
    return <>
        <div>
            
        </div>
            <div>
            <Link to='/NewPost'>Want to Post something?</Link>
            <br></br>
            <button onClick={handleLogout}>Logout</button>        
       </div>
    </>
}
