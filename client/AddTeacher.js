import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { ArrowLeft, UserPlus, Save } from 'lucide-react';
import './CreateBatch.css';
import { API_URL } from './config';

const AddTeacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", subject: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // In a real app, you would send this to /api/auth/register-teacher
        // For now, we simulate a success
        console.log("Registering Teacher:", formData);
        alert(`Teacher ${formData.name} added! They can login with ${formData.email}`);
        navigate('/admin');
    } catch (err) {
        alert("Failed to add teacher");
    }
  };

  return (
    <div className="create-batch-container">
      <header className="page-header">
        <Link to="/admin" className="back-btn"><ArrowLeft size={20} /> Back</Link>
        <h2>Add New Teacher</h2>
      </header>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <h3>Teacher Details</h3>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Ram Kumar" required 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Email Address (Login ID)</label>
                    <input type="email" placeholder="teacher@tution.com" required 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Default Password</label>
                    <input type="text" placeholder="password123" required 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Subject Specialization</label>
                    <input type="text" placeholder="e.g. Physics" required 
                        onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                </div>
            </div>
            <button type="submit" className="save-btn"><UserPlus size={18}/> Register Teacher</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;