import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import { ArrowLeft, Upload, Save } from 'lucide-react';
import './CreateBatch.css'; // Reusing the same CSS
import { API_URL } from './config';

const EditBatch = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the Course ID from the URL
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "SEE Preparation",
    thumbnail: "",
  });

  // 1. Fetch Existing Data when Page Loads
  useEffect(() => {
    const fetchCourse = async () => {
        try {
            const res = await axios.get(`${API_URL}/courses/${id}`);
            setFormData({
                title: res.data.title,
                description: res.data.description,
                price: res.data.price,
                category: res.data.category,
                thumbnail: res.data.thumbnail,
            });
        } catch (err) {
            console.error("Error fetching course:", err);
            alert("Could not load course data.");
            navigate('/admin');
        } finally {
            setFetching(false);
        }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Send PUT Request to Update
        await axios.put(`${API_URL}/courses/${id}`, {
            ...formData,
            price: Number(formData.price) // Ensure price is a number
        });
        
        alert("✅ Batch Updated Successfully!");
        navigate('/admin');
    } catch (err) {
        console.error("Update Error:", err);
        alert("Failed to update batch.");
    } finally {
        setLoading(false);
    }
  };

  if (fetching) return <div style={{padding:'50px', textAlign:'center', color:'white'}}>Loading Course Data...</div>;

  return (
    <div className="create-batch-container">
      <header className="page-header">
        <Link to="/admin" className="back-btn">
            <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <h2>Edit Batch: {formData.title}</h2>
      </header>

      <div className="form-wrapper">
        <form onSubmit={handleUpdate}>
            <div className="form-section">
                <h3>Basic Information</h3>
                
                <div className="form-group">
                    <label>Batch Title</label>
                    <input 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        type="text" 
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

            {/* Media Section */}
            <div className="form-section">
                <h3>Media</h3>
                <div className="upload-box" onClick={() => alert("Image upload requires cloud storage setup.")}>
                    <Upload size={30} color="#64748b" />
                    <p>Current Thumbnail: {formData.thumbnail ? "Uploaded" : "None"}</p>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Updating..." : <><Save size={18} /> Update Batch</>}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditBatch;