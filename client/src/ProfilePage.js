import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Camera } from 'lucide-react';
import './CreateBatch.css'; // Reusing form styles

const ProfilePage = () => {
  return (
    <div className="create-batch-container">
      <header className="page-header">
        <Link to="/dashboard" className="back-btn">
            <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <h2>Profile Settings</h2>
      </header>

      <div className="form-wrapper profile-wrapper">
        {/* Profile Pic Section */}
        <div className="profile-pic-section">
            <div className="large-avatar">TM</div>
            <button className="change-pic-btn"><Camera size={16}/> Change</button>
        </div>

        <form>
            <div className="form-group">
                <label><User size={16}/> Full Name</label>
                <input type="text" defaultValue="Tution Mater" />
            </div>

            <div className="form-group">
                <label><Mail size={16}/> Email Address</label>
                <input type="email" defaultValue="admin@tutionmater.com" disabled className="disabled-input"/>
            </div>

            <div className="form-group">
                <label>Bio / About Me</label>
                <textarea rows="3" defaultValue="Physics Teacher with 10 years of experience."></textarea>
            </div>

            <hr className="divider" />

            <h3>Change Password</h3>
            <div className="form-row">
                <div className="form-group">
                    <label><Lock size={16}/> New Password</label>
                    <input type="password" />
                </div>
                <div className="form-group">
                    <label><Lock size={16}/> Confirm Password</label>
                    <input type="password" />
                </div>
            </div>

            <button className="save-btn full-width-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;