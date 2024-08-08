import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

// import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {logout} from '../../api/authAPI.js'

export default function Header() {
    const { isAuthenticated, changeAuthState } = useContext(AuthContext);
   

    const navigate = useNavigate();
    console.log(isAuthenticated);

    const handleLogout = async () => {
        try {
            await logout();
            changeAuthState({
                userId: '',
                email: '',
                accessToken: '',
                isAuthenticated: false,
            });
            navigate('/'); // Пренасочи потребителя към началната страница
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        // <header>
        //     <h1><Link className="home" to="/">Cats Blog</Link></h1>
        //     <nav>
        //         <Link to="/cats">All cats</Link>
        //         {isAuthenticated
        //             ? (
        //                 <div id="user">
        //                     <Link to="/cats/create">Create Cat</Link>
        //                     <Link to="/logout">Logout</Link>
        //                 </div>
        //             )
        //             : (
        //                 <div id="guest">
        //                     <Link to="/login">Login</Link>
        //                     <Link to="/register">Register</Link>
        //                 </div>
        //             )
        //         }


        //     </nav>
        // </header>
        
        <header className='bg-slate-700 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

            <Link to={'/'}>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-white'>Cat</span>
                    <span className='text-yellow-300'>Blog</span>
                </h1>
            </Link>

           

            <ul className='flex gap-4'>
                <Link to={'/'}>
                    <li className='hidden sm:inline text-yellow-300 hover:underline'>Home</li>
                </Link>
                {/* <Link to={'/about'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link> */}
                <Link to="/cats" className='hidden sm:inline text-yellow-300 hover:underline'>All cats</Link>
                 {isAuthenticated
                    ? (
                        <div id="user" className='flex gap-4'>
                            <Link to="/cats/create" className='text-yellow-300 hover:underline'>Create Cat</Link>
                            <Link to="/" onClick={handleLogout} className='text-yellow-300 hover:underline'>Logout</Link>
                          
                        </div>
                    )
                    : (
                        <div id="guest" className='flex gap-4'>
                            <Link to="/login" className='hidden sm:inline text-yellow-300 hover:underline'>Login</Link>
                            <Link to="/register" className='hidden sm:inline text-yellow-300 hover:underline'>Register</Link>
                        </div>
                    )
                }

            </ul>

        </div>
    </header>
    );
}