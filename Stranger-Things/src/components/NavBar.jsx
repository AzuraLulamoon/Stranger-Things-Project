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
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Profile'>Profile</Link></li>
                {token ? null : <li><Link to='/Login'>Login</Link></li>}
            </ul>
        </nav>
    );
}