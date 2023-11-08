import React, { useState } from 'react';
import { useAuth } from './contexts/auth';

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Handle error here (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="email"
        className="w-full p-2 mb-4 rounded border"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn-primary w-full" onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordPage;
