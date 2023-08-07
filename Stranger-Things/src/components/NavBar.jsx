import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    return (
        <div className="navigation" style={{ position:'fixed', top: '0', width: '100%', left: '0'}}>
            <nav className='navDiv'>
                <h1 className="postsTitle">Stranger Things</h1>
                <ul className='navList'>
                    <li id='homeLink'><Link to='/'>Home</Link></li>
                    <li id='profileLink'><Link to='/Profile'>Profile</Link></li>
                    {token ? null : <li id='loginLink'><Link to='/Login'>Sign in to your account!</Link></li>}
                </ul>
            </nav>
        </div>
    );
}