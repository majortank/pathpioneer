import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/auth';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const {user, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/pioneer');
    }
  }, [user, navigate]);
  return (
    <div className=' h-screen'>
        <div className="container bg-base-100 mx-auto mt-8 p-4 max-w-md rounded">
      <h1 className=" text-4xl font-bold mb-4">Reset Password</h1>
      <p className="mb-4 text-base">
        Enter your email address and we will send you a link to reset your
        password.</p>
      <input
        type="email"
        className="p-2 mb-4 rounded border w-full"
        placeholder="youremail@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn-secondary hover:btn-primary text-white w-full p-4 rounded-sm" onClick={handleResetPassword}>Reset Password</button>
    </div>
    </div>
  );
};

export default ResetPasswordPage;
