import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { LayoutDashboard, PlusCircle, Users, Settings, LogOut, DollarSign, BookOpen, Edit, Trash2, FileText } from 'lucide-react';
import './Dashboard.css'; // Reusing Dashboard styles
import logoImg from './assets/logo.jpg'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [realBatches, setRealBatches] = useState([]);
  
  // Dashboard Stats State
  const [stats, setStats] = useState({
    revenue: 0,
    students: 1250, // Dummy value until we fetch real users
    activeBatches: 0
  });

  // 1. Check if user is Admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') {
        navigate('/login'); // Kick out if not admin
    }
  }, [navigate]);

  // 2. Fetch Real Data from Backend
  useEffect(() => {
    const fetchAdminData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/courses");
            const batches = res.data;
            setRealBatches(batches);

            // Calculate simple stats based on real data
            // Assuming average of 10 students per batch for demo revenue calculation
            const totalRevenue = batches.reduce((acc, curr) => acc + (curr.price * 10), 0); 
            
            setStats(prev => ({
                ...prev,
                revenue: totalRevenue,
                activeBatches: batches.length
            }));
            
        } catch (err) {
            console.error("Error fetching admin data:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(amount);
  };

  return (
    <div className="dashboard-container">
      {/* --- ADMIN SIDEBAR --- */}
      <aside className="sidebar open">
        <div className="sidebar-header">
            <img src={logoImg} alt="Logo" className="dash-logo" />
            <span className="dash-brand">Admin Panel</span>
        </div>

        <nav className="sidebar-nav">
            <Link to="/admin" className="nav-item active"><LayoutDashboard size={20}/> Dashboard</Link>
            <Link to="/admin/create-batch" className="nav-item"><PlusCircle size={20}/> Create Batch</Link>
            <Link to="/profile" className="nav-item"><Settings size={20}/> Settings</Link>
        </nav>

        <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn-styled"><LogOut size={20} /> Logout</button>
        </div>
      </aside>

      {/* --- ADMIN CONTENT --- */}
      <main className="main-content">
        <header className="dash-header">
            <h2>Teacher Dashboard</h2>
            <div className="user-profile">
                <div className="avatar" style={{background: '#10b981'}}>T</div>
                <span className="username">Tution Mater (Admin)</span>
            </div>
        </header>

        {/* 1. Stats Row */}
        <div className="stats-row">
            <div className="stat-box">
                <DollarSign size={24} color="#10b981"/>
                <div>
                    <h4>{formatCurrency(stats.revenue)}</h4>
                    <p>Estimated Revenue</p>
                </div>
            </div>
            <div className="stat-box">
                <Users size={24} color="#3b82f6"/>
                <div>
                    <h4>{stats.students}</h4>
                    <p>Total Students</p>
                </div>
            </div>
            <div className="stat-box">
                <BookOpen size={24} color="#f59e0b"/>
                <div>
                    <h4>{stats.activeBatches}</h4>
                    <p>Active Batches</p>
                </div>
            </div>
        </div>

        {/* 2. Manage Batches Section */}
        <section className="my-courses">
            <div className="section-top-row" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                <h3>Your Batches</h3>
                <Link to="/admin/create-batch">
                    <button className="continue-btn" style={{width: 'auto', marginTop: 0, display:'flex', alignItems:'center', gap:'5px'}}>
                        <PlusCircle size={18} /> Create New
                    </button>
                </Link>
            </div>

            {/* Admin Table */}
            <div className="admin-table-container">
                {loading ? (
                    <div style={{textAlign:'center', padding:'20px', color:'#94a3b8'}}>Loading data...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Batch Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {realBatches.length > 0 ? realBatches.map((batch) => (
                                <tr key={batch._id}>
                                    <td style={{fontWeight:'500'}}>{batch.title}</td>
                                    <td>{batch.category || 'General'}</td>
                                    <td>{formatCurrency(batch.price)}</td>
                                    <td>
                                        <span className="status-badge active">Active</span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="icon-btn edit" title="Edit Course"><Edit size={16}/></button>
                                            <button className="icon-btn" title="Upload Notes" style={{color:'#f59e0b'}}>
                                                <FileText size={16}/>
                                            </button>
                                            <button className="icon-btn delete" title="Delete Course"><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{textAlign:'center', padding:'30px', color:'#64748b'}}>
                                        No batches found. Create your first batch now!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;