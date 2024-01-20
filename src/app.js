import React from 'react';
import './app.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Landing from './Landing';
import Updates from './updates';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/pioneer" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

