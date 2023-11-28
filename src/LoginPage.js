import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const LoginPage = () => {
  const {user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!", {
        icon: '🙂',
      });
      navigate('/pioneer');
    } catch (error) {
      // Handle signup errors (for example, display an error message to the user)
      toast.error(error.message, {
        icon: '😕',
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/pioneer");
    }
  }, [user]);

  return (
    <>
      <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
        <h2 className="text-2xl font-bold mb-4">Your Career Adventure Awaits</h2>
        <form className='' onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className='space-y-1'>
              <label className="label">
                <span className="label-text">Enter your email?</span>
              </label>
              <input
                type="email"
                className="input input-bordered input-primary w-full"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className='space-y-1'>
              <label className="label">
                <span className="label-text">Enter your password?</span>
              </label>
              <input
                type="password"
                className="input input-bordered input-primary w-full"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>
            <div className='space-y-1'>
              <button className="btn-primary w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <p className="mt-4 mx-auto text-sm">
          Don't have an account? <Link to="/register" className="link link-primary">Sign up here</Link>.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
