import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const option = <>
        <li > <NavLink to="/" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Home</NavLink></li>
        <li > <NavLink to="/colleges" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Colleges</NavLink></li>
        <li > <NavLink to="/admission" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Admission</NavLink></li>
        <li > <NavLink to="/mycollege" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>My Collage</NavLink></li>
    </>
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 purple-primary lg:px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {option}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">AdmitHub</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="purple-primary flex gap-5 px-1">
                       {option}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/login"className="btn">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;