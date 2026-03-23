import { useState } from 'react';
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () =>{
        setShowMenu(!showMenu);
    }

    const navigate = useNavigate();
    const logout = () =>{
        localStorage.removeItem('AuthToken');
        navigate('/login', {replace:true} )
    }
  return (
    <nav className='nav-head glass'>
        <div className="nav-left">
            <Link to="/home" className='nav-logo'>MyStore</Link>
        </div>
        <div className="nav-center">
            <Link to="/home" className='nav-links'>Home</Link>
            <Link to="/categories" className='nav-links'>Categories</Link>
            <Link to="/orders" className='nav-links'>Orders</Link>
            <Link to="/cart" className='nav-links'>Cart</Link>
        </div>
        <div className="nav-end" onClick={toggleMenu}>
            <div className="user-icon">👤</div>
            {showMenu && (
                <div className="dropdown-menu glass">
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar
