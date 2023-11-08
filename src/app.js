import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; // Import your Navbar component
import HomePage from './HomePage'; // Import your HomePage component
import LoginPage from './LoginPage'; // Import your LoginPage component
import SignUpPage from './SignUpPage';
// import ProfilePage from './ProfilePage'; // Import your ProfilePage component
// import SettingsPage from './SettingsPage'; // Import your SettingsPage component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Display the Navbar on every page */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} /> */}
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
