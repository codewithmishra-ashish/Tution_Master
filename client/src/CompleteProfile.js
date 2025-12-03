import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, MapPin, Phone, Camera, ArrowRight, Save } from 'lucide-react';
import './CreateBatch.css'; // Reusing form styles

const CompleteProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    profilePic: "https://placehold.co/150x150?text=Profile" // Default
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await axios.put(`http://localhost:5000/api/users/update-profile/${user._id}`, formData);
        
        // Update Local Storage with new complete user data
        localStorage.setItem("user", JSON.stringify(res.data));
        
        alert("Profile Completed!");
        navigate('/dashboard');
    } catch (err) {
        console.error(err);
        alert("Error updating profile");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="create-batch-container">
      <div className="form-wrapper" style={{maxWidth: '500px'}}>
        <header style={{textAlign:'center', marginBottom: '30px'}}>
            <h2>Complete Your Profile</h2>
            <p style={{color:'#94a3b8'}}>We need a few more details to get you started.</p>
        </header>

        <form onSubmit={handleSubmit}>
            {/* Fake Image Upload */}
            <div className="profile-pic-section">
                <img src={formData.profilePic} alt="Profile" style={{width:'80px', height:'80px', borderRadius:'50%', marginBottom:'10px'}} />
                <button type="button" className="change-pic-btn" onClick={() => alert("Image Upload Feature would integrate with S3/Cloudinary here.")}>
                    <Camera size={16}/> Upload Photo
                </button>
            </div>

            <div className="form-group">
                <label><MapPin size={16}/> Address / City</label>
                <input type="text" placeholder="e.g. Kathmandu, Baneshwor" required 
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label><Phone size={16}/> Phone Number</label>
                <input type="text" placeholder="98XXXXXXXX" required 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
            </div>

            <button type="submit" className="save-btn full-width-btn" disabled={loading}>
                {loading ? "Saving..." : <>Save & Continue <ArrowRight size={18}/></>}
            </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;