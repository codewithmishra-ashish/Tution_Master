import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import './LoginPage.css';
import logoImg from './assets/logo.jpg'; 
import { API_URL } from './config'; // Import the smart config

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "text" ? "name" : e.target.type]: e.target.value });
  };
  
  // Specific handler for text input (Name) to avoid type conflict
  const handleNameChange = (e) => {
      setFormData({ ...formData, name: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        if (isLogin) {
            // --- LOGIN LOGIC ---
            const res = await axios.post(`${API_URL}/auth/login`, {
                email: formData.email,
                password: formData.password
            });

            // 1. Save Data to Browser
            localStorage.setItem("user", JSON.stringify(res.data)); 
            localStorage.setItem("token", res.data.token); 

            // 2. Check Role & Redirect
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } else {
            // --- REGISTER LOGIC ---
            await axios.post(`${API_URL}/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            alert("Account created! Please log in.");
            setIsLogin(true); // Switch to login view
        }
    } catch (err) {
        setError(err.response?.data?.message || "Connection failed. Please check backend.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
            <img src={logoImg} alt="Logo" className="auth-logo" />
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Please enter your details.' : 'Join Tution Mater today.'}</p>
        </div>

        {error && <div style={{color: '#ef4444', marginBottom: '15px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '5px', fontSize: '0.9rem'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="input-group">
                    <User size={20} className="input-icon" />
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={handleNameChange}
                        required 
                    />
                </div>
            )}
            <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <Loader className="spin" size={20}/> : (isLogin ? 'Log In' : 'Sign Up')} 
                {!loading && <ArrowRight size={18} />}
            </button>
        </form>

        <div className="auth-footer">
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button className="link-btn" onClick={() => {setIsLogin(!isLogin); setError("");}}>
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