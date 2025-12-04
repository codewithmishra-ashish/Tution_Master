import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { ArrowLeft, Upload, Save, Loader, X } from 'lucide-react';
import './CreateBatch.css';
import { API_URL } from './config';

const CreateBatch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "SEE Preparation",
    thumbnail: "", // This will store the Cloudinary URL
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: HANDLE IMAGE UPLOAD ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImg(true);
    const data = new FormData();
    data.append("image", file); // Must match backend 'upload.single("image")'

    try {
        const res = await axios.post(`${API_URL}/upload`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        // Save the URL we got back
        setFormData({ ...formData, thumbnail: res.data.url });
    } catch (err) {
        console.error("Upload failed", err);
        alert("Image upload failed");
    } finally {
        setUploadingImg(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Use default image if none uploaded
    const finalThumbnail = formData.thumbnail || "https://placehold.co/600x400?text=Course";

    const payload = {
        ...formData,
        price: Number(formData.price),
        thumbnail: finalThumbnail
    };

    try {
        await axios.post(`${API_URL}/courses`, payload);
        alert("✅ Batch Published Successfully!");
        navigate('/admin');
    } catch (err) {
        alert("Failed to create batch.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="create-batch-container">
      <header className="page-header">
        <Link to="/admin" className="back-btn"><ArrowLeft size={20} /> Back to Dashboard</Link>
        <h2>Create New Batch</h2>
      </header>

      <div className="form-wrapper">
        <form onSubmit={handleCreate}>
            <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-group">
                    <label>Batch Title</label>
                    <input name="title" onChange={handleChange} type="text" placeholder="e.g. Class 12 Chemistry" required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" onChange={handleChange} rows="4" placeholder="What will students learn?" required></textarea>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Price (Rs.)</label>
                        <input name="price" onChange={handleChange} type="number" placeholder="2500" required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" onChange={handleChange}>
                            <option>SEE Preparation</option>
                            <option>+2 Science</option>
                            <option>Entrance Prep</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- MEDIA SECTION (UPDATED) --- */}
            <div className="form-section">
                <h3>Media</h3>
                <div className="upload-box" style={{position:'relative'}}>
                    {uploadingImg ? (
                        <div style={{color:'#3b82f6'}}>Uploading Image...</div>
                    ) : formData.thumbnail ? (
                        <div style={{position:'relative', width:'100%', height:'200px'}}>
                            <img src={formData.thumbnail} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px'}} />
                            <button 
                                type="button" 
                                onClick={() => setFormData({...formData, thumbnail: ""})}
                                style={{position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.7)', color:'white', border:'none', borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer'}}
                            >
                                <X size={16}/>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Upload size={30} color="#64748b" />
                            <p>Click to upload Thumbnail</p>
                            {/* Hidden Input Triggered by Box Click */}
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', opacity:0, cursor:'pointer'}} 
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                <button type="submit" className="save-btn" disabled={loading || uploadingImg}>
                    {loading ? "Publishing..." : <><Save size={18} /> Publish Batch</>}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;