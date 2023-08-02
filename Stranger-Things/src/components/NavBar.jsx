import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Profile'>Profile</Link></li>
                <li><Link to='/Login'>Login</Link></li>
            </ul>
        </nav>
    )
}