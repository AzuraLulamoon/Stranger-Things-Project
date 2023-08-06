import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    return (
        <nav className="navigation">
            <ul>
                <li id='homeLink'><Link to='/'>Home</Link></li>
                <li id='profileLink'><Link to='/Profile'>Profile</Link></li>
                {token ? null : <li id='loginLink'><Link to='/Login'>Sign in to your account!</Link></li>}
            </ul>
        </nav>
    );
}