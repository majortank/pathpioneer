import React, { useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import '../app.css';

import logo1 from '../images/logo1.png';

import {BsFillPersonFill} from 'react-icons/bs';
import { Link } from 'react-router-dom/dist';

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing in:', error);
      
    }
  };
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-5 inline-block">
            <div className=" w-12  rounded-full">
                <img src={logo1} />
            </div>
            
            </label>
            <a href='/' className="btn btn-ghost normal-case text-xl"><span className=" text-indigo-500 text-2xl logo">Path</span><span className=" text-fuchsia-500 text-2xl logo">Pioneer</span></a>
        </div>
    <div className="flex-none mr-2">
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                {
                    !user ? <BsFillPersonFill className=' w-10 h-8 bg-primary text-white' /> :
                    <BsFillPersonFill className=' w-10 h-8 bg-secondary text-white' />
                }
            </div>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li className=' mb-2'>
            {
                !user ? (
                    <a className="justify-between text-xs bg-primary text-white">
                {
                    user?.email ? user.email : "Sing in below"
                }
            </a>
                ) :
                (
                    <a className="justify-between text-xs bg-secondary text-white">
                {
                    user?.email ? user.email : "Sing in below"
                }
            </a>
                )
            }
            </li>
            {
            user ? (
                <li>
                    <Link onClick={handleLogout}>Logout</Link>
                </li>
                ) : (
                <>
                <li className=' mb-2'>
                    <Link to={'/login'} >Login</Link>
                </li>
                <li>
                    <Link to={'/register'} >Register</Link>
                </li>
                </>
                )
            }
        </ul>
        </div>
    </div>
    </div>
  );
};

export default Navbar;
