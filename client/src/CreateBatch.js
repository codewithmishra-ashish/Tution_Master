import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { ArrowLeft, Upload, Save, Loader } from 'lucide-react';
import './CreateBatch.css';

const CreateBatch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "SEE Preparation",
    thumbnail: "https://placehold.co/600x400?text=Course", // Default Image
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Prepare Data (Force price to be a number)
    const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price), 
        category: formData.category,
        thumbnail: formData.thumbnail,
        // Default dummy links for now
        notesLink: "",
        homeworkLink: ""
    };

    console.log("🚀 Sending Payload:", payload); // Check your browser console (F12)

    try {
        const res = await axios.post("http://localhost:5000/api/courses", payload);
        console.log("✅ Server Response:", res.data);
        
        alert("Batch Published Successfully!");
        navigate('/admin'); // Go back to dashboard to see the new batch
    } catch (err) {
        console.error("❌ Creation Error:", err);
        alert("Failed to create batch. Check console for details.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="create-batch-container">
      <header className="page-header">
        <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <h2>Create New Batch</h2>
      </header>

      <div className="form-wrapper">
        <form onSubmit={handleCreate}>
            <div className="form-section">
                <h3>Basic Information</h3>
                
                <div className="form-group">
                    <label>Batch Title</label>
                    <input 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="e.g. Class 12 Chemistry" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        rows="4" 
                        placeholder="What will students learn?" 
                        required
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price (Rs.)</label>
                        <input 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            type="number" 
                            placeholder="2500" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="SEE Preparation">SEE Preparation</option>
                            <option value="+2 Science">Class 11/12 Science</option>
                            <option value="Entrance Prep">Entrance Prep</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Media Section (Static for now) */}
            <div className="form-section">
                <h3>Media</h3>
                <div className="upload-box" onClick={() => alert("Image upload requires cloud storage setup (AWS/Cloudinary). Using default image for now.")}>
                    <Upload size={30} color="#64748b" />
                    <p>Click to upload Thumbnail</p>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Publishing..." : <><Save size={18} /> Publish Batch</>}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;