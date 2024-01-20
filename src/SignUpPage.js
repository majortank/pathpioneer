import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import './app.css';

import toast from 'react-hot-toast';

const SignUpPage = () => {
  const { user, signUpWithEmailAndPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password matches confirmPassword
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.',{
        icon:'🤔'
      });
      return;
    }

    try {
      // Call the signUpWithEmailAndPassword function from the context provider
      await signUpWithEmailAndPassword(email, password);
      // Redirect the user after successful signup
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      // Handle signup errors (for example, display an error message to the user)
      console.error('Error signing up:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/pioneer');
    }
  }, [user]);

  return (
    <div className=' h-screen'>
        <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-primary">Register 📝</h2>
        <h3 className="text-lg mb-4 text-secondary">Start Your Career Quest 🚀</h3>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
              <input 
              type="email" 
              name="floating_email" 
              id="floating_email" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" "
              value={email}
              onChange={handleChangeEmail} 
              required />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input 
              type="password" 
              name="floating_password" 
              id="floating_password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              value={password}
              onChange={handleChangePassword}
              required 
              />
              <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input 
              type="password" 
              name="repeat_password" 
              id="floating_repeat_password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required />
              <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
          </div>
          <button type="submit" className="w-full text-white bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
              Already have an account? <Link to={'/login'} className="font-medium text-primary hover:underline dark:text-primary-500">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
