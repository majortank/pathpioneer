import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import './app.css';

import toast from 'react-hot-toast';

const Register = () => {
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
    <div className='h-screen'>
        <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-secondary">Register 📝</h2>
        <form className=' w-full' onSubmit={handleSubmit}>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Email</span>
            </label> 
            <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={handleChangeEmail}
            />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label> 
            <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={handleChangePassword}
            />

            <label className="label">
                <span className="label-text">Repeat Password</span>
            </label> 
            <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
            />
            </div>
            <button className="btn btn-secondary mt-4 text-white">Register</button>
        </form>
        <p className="mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary">
            Login
            </Link>
        </p>
        </div>
    </div>
  );
};

export default Register;
