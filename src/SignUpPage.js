import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import './app.css';

const SignUpPage = () => {
  const { user, signUpWithEmailAndPassword } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password matches confirmPassword
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      // Call the signUpWithEmailAndPassword function from the context provider
      await signUpWithEmailAndPassword(formData.email, formData.password);
      // Redirect the user after successful signup
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      // Handle signup errors (for example, display an error message to the user)
      console.error('Error signing up:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Start Your Career Quest</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="label">
              <span className="label-text">What is your email?</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="label">
              <span className="label-text">Repeat your password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="link link-primary">Sign in here</Link>.
      </p>
    </div>
  );
};

export default SignUpPage;
