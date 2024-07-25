import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Header() {
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

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
        <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

            <Link to={'/'}>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Cat</span>
                    <span className='text-slate-700'>Blog</span>
                </h1>
            </Link>

           

            <ul className='flex gap-4'>
                <Link to={'/'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to={'/about'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>

            </ul>

        </div>
    </header>
    );
}