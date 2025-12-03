import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import './CreateBatch.css'; // We will create this css

const CreateBatch = () => {
  const navigate = useNavigate();

  // Handle Form Submit
  const handleCreate = (e) => {
    e.preventDefault();
    alert("Batch Created Successfully!");
    navigate('/admin');
  };

  return (
    <div className="create-batch-container">
      {/* Header */}
      <header className="page-header">
        <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <h2>Create New Batch</h2>
      </header>

      {/* Form Container */}
      <div className="form-wrapper">
        <form onSubmit={handleCreate}>
            {/* 1. Basic Info */}
            <div className="form-section">
                <h3>Basic Information</h3>
                
                <div className="form-group">
                    <label>Batch Title</label>
                    <input type="text" placeholder="e.g. Class 12 Chemistry" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" placeholder="What will students learn?" required></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price (Rs.)</label>
                        <input type="number" placeholder="2500" required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select>
                            <option>SEE Preparation</option>
                            <option>+2 Science</option>
                            <option>Entrance Prep</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 2. Media */}
            <div className="form-section">
                <h3>Media</h3>
                <div className="upload-box">
                    <Upload size={30} color="#64748b" />
                    <p>Click to upload Thumbnail</p>
                    <input type="file" hidden />
                </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                <button type="submit" className="save-btn">
                    <Save size={18} /> Publish Batch
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;