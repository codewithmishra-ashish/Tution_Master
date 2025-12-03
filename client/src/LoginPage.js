import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './LoginPage.css';
import logoImg from './assets/logo.jpg'; 

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

// Inside src/LoginPage.js

const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Login Logic
    console.log("Logged in!");
    
    // Redirect to Dashboard
    navigate('/dashboard'); 
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
            <img src={logoImg} alt="Logo" className="auth-logo" />
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Please enter your details.' : 'Join Tution Mater today.'}</p>
        </div>

        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="input-group">
                    <User size={20} className="input-icon" />
                    <input type="text" placeholder="Full Name" required />
                </div>
            )}
            <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input type="email" placeholder="Email Address" required />
            </div>
            <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="auth-btn">
                {isLogin ? 'Log In' : 'Sign Up'} <ArrowRight size={18} />
            </button>
        </form>

        <div className="auth-footer">
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button className="link-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </p>
            {isLogin && <button className="forgot-btn">Forgot Password?</button>}
            <div style={{marginTop: '15px'}}>
              <Link to="/" className="link-btn">← Back to Home</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;