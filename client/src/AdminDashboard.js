import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { LayoutDashboard, PlusCircle, Users, Settings, LogOut, BookOpen, Menu, X, Briefcase, Calendar } from 'lucide-react';
import './Dashboard.css'; 
import logoImg from './assets/logo.png'; 
import { API_URL } from './config';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
  const [activeTab, setActiveTab] = useState('batches'); // 'batches' or 'teachers'
  const [realBatches, setRealBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') navigate('/login');
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
        const batchRes = await axios.get(`${API_URL}/courses`);
        setRealBatches(batchRes.data);
        // Mocking Teacher Data (Replace with real API later)
        setTeachers([
            { id: 1, name: "Hari Bahadur", subject: "Physics", email: "hari@tution.com" },
            { id: 2, name: "Sita Rai", subject: "Chemistry", email: "sita@tution.com" }
        ]);
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Toggle */}
      <div className="mobile-header">
        <img src={logoImg} alt="Logo" className="mobile-logo" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn">
            {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
            <img src={logoImg} alt="Logo" className="dash-logo" />
            <span className="dash-brand">Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
            <button onClick={() => setActiveTab('batches')} className={`nav-item ${activeTab === 'batches' ? 'active' : ''}`}>
                <LayoutDashboard size={20}/> Manage Batches
            </button>
            <button onClick={() => setActiveTab('teachers')} className={`nav-item ${activeTab === 'teachers' ? 'active' : ''}`}>
                <Briefcase size={20}/> Manage Teachers
            </button>
            <Link to="/admin/schedule" className="nav-item"><Calendar size={20}/> Master Schedule</Link>
            <Link to="/profile" className="nav-item"><Settings size={20}/> Settings</Link>
        </nav>
        <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn-styled"><LogOut size={20} /> Logout</button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="main-content">
        <header className="dash-header desktop-only">
            <h2>{activeTab === 'batches' ? 'Batch Management' : 'Teacher Management'}</h2>
            <div className="user-profile"><div className="avatar">A</div><span>Admin</span></div>
        </header>

        {activeTab === 'batches' ? (
            // --- BATCHES VIEW ---
            <section className="my-courses">
                <div className="section-top-row">
                    <h3>Active Batches</h3>
                    <Link to="/admin/create-batch" className="continue-btn" style={{width:'auto', marginTop:0}}>
                        <PlusCircle size={18}/> New Batch
                    </Link>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead><tr><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
                        <tbody>
                            {realBatches.map(b => (
                                <tr key={b._id}>
                                    <td>{b.title}</td>
                                    <td>Rs. {b.price}</td>
                                    <td><button className="icon-btn edit">Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        ) : (
            // --- TEACHERS VIEW ---
            <section className="my-courses">
                <div className="section-top-row">
                    <h3>Registered Teachers</h3>
                    <Link to="/admin/add-teacher" className="continue-btn" style={{width:'auto', marginTop:0}}>
                        <PlusCircle size={18}/> Add Teacher
                    </Link>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead><tr><th>Name</th><th>Subject</th><th>Email</th><th>Actions</th></tr></thead>
                        <tbody>
                            {teachers.map(t => (
                                <tr key={t.id}>
                                    <td><div className="avatar-sm">{t.name[0]}</div> {t.name}</td>
                                    <td>{t.subject}</td>
                                    <td>{t.email}</td>
                                    <td><button className="icon-btn delete">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        )}
      </main>
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default AdminDashboard;