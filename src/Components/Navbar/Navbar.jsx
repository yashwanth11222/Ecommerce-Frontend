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
    <div className='nav-head'>
        <div className="left" id='nav-items'>
            <Link to="/Home" className='nav-links'>Home</Link>
        </div>
        <div className="center" id='nav-items'>
            <Link to="/Categories" className='nav-links'>Categories</Link>
            <Link to="/Orders" className='nav-links'>Orders</Link>
            <Link to="/Cart" className='nav-links'>Cart <span>{}</span></Link>
        </div>
        <div className="end" id='nav-items' onClick={toggleMenu}>
            👤
            {showMenu && (
                <div className="dropdown-menu">
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar
