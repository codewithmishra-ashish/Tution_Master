import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import './LoginPage.css';
import logoImg from './assets/logo.jpg'; 

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
    setFormData({ ...formData, [e.target.type]: e.target.value });
    // Note: for name input, ensure name="name" or handle separately if type="text" conflicts
  };
  
  // specific handler for text input (Name)
  const handleNameChange = (e) => {
      setFormData({ ...formData, name: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const API_URL = "http://localhost:5000/api/auth"; // Your Backend URL

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email: formData.email,
            password: formData.password
        });

        // 1. Save User Data
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);

        // 2. ROLE BASED REDIRECT
        // If the backend says role is 'admin', go to admin panel
        if (res.data.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    } else {
            // --- REGISTER LOGIC ---
            await axios.post(`${API_URL}/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            // On success, switch to login view
            alert("Account created! Please log in.");
            setIsLogin(true);
        }
    } catch (err) {
        // Handle Errors (e.g., Wrong password, User already exists)
        setError(err.response?.data?.message || "Something went wrong");
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

        {error && <div style={{color: '#ef4444', marginBottom: '15px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '5px'}}>{error}</div>}

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