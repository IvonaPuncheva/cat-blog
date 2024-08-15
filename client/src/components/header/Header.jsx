import { useAuthContext } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { logout } from '../../api/authAPI.js';
import { FaBars, FaTimes } from 'react-icons/fa'; // Импортирайте иконите за менюто

export default function Header() {
    const { isAuthenticated, changeAuthState } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Състояние за контролиране на отварянето на менюто

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            changeAuthState({
                userId: '',
                email: '',
                accessToken: '',
                isAuthenticated: false,
            });
            navigate('/'); 
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='bg-slate-700 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-white'>Cat</span>
                        <span className='text-yellow-300'>Blog</span>
                    </h1>
                </Link>

                <button
                    className="sm:hidden text-yellow-300 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />} 
                </button>

                <ul className={`flex flex-col sm:flex-row gap-4 absolute sm:static bg-slate-700 sm:bg-transparent w-full sm:w-auto sm:flex ${isMenuOpen ? 'top-12' : 'top-[-500px]'} transition-all duration-300`}>
                    <Link to={'/'} onClick={toggleMenu}>
                        <li className='text-yellow-300 hover:underline p-2'>Home</li>
                    </Link>
                    <Link to="/cats" onClick={toggleMenu} className='text-yellow-300 hover:underline p-2'>All cats</Link>
                    {isAuthenticated
                        ? (
                            <div id="user" className='flex flex-col sm:flex-row gap-4'>
                                <Link to="/cats/create" onClick={toggleMenu} className='text-yellow-300 hover:underline p-2'>Create Cat</Link>
                                <Link to="/" onClick={() => { handleLogout(); toggleMenu(); }} className='text-yellow-300 hover:underline p-2'>Logout</Link>
                            </div>
                        )
                        : (
                            <div id="guest" className='flex flex-col sm:flex-row gap-4'>
                                <Link to="/login" onClick={toggleMenu} className='text-yellow-300 hover:underline p-2'>Login</Link>
                                <Link to="/register" onClick={toggleMenu} className='text-yellow-300 hover:underline p-2'>Register</Link>
                            </div>
                        )
                    }
                </ul>
            </div>
        </header>
    );
}
