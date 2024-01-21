import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/auth';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';


const LoginPage = () => {
  const {user, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
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
      toast.success("Welcome!", {
        icon: '🙂',
      });
      navigate(location.state?.from || '/pioneer');
    } catch (error) {
      // Handle signup errors (for example, display an error message to the user)
      toast.error(error.message, {
        icon: '😕',
      });
    }
  };

  const getRedirectRoute = () => {
    // Access the state passed during navigation
    return location.state?.from;
  }

  console.log(getRedirectRoute());

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || '/pioneer');
    }
  }, [user, navigate, location.state]);

  return (
    <div className=' h-screen'>
        <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-secondary">Login 🔑</h2>
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
                required
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
                required
            />
            </div>
            <button type='submit' className="btn btn-secondary mt-4 text-white">Login</button>
        </form>
        <p className="mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-secondary">
            Register
            </Link>
        </p>
        </div>
    </div>
  );
};

export default LoginPage;
