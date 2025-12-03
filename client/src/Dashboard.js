import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Video, FileText, LogOut, Menu, X, PlayCircle, Lock } from 'lucide-react';
import './Dashboard.css';
import logoImg from './assets/logo.jpg'; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
        navigate('/login');
    } else {
        fetchCourses();
    }
  }, [user, navigate]);

  const fetchCourses = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
    } catch (err) {
        console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  if (!user) return null;

  // Filter Courses
  const enrolledCourseIds = user.enrolledCourses || []; // Array of IDs
  const enrolledList = courses.filter(c => enrolledCourseIds.includes(c._id));
  const availableList = courses.filter(c => !enrolledCourseIds.includes(c._id));

  return (
    <div className="dashboard-container">
      {/* Sidebar (Same as before) */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            <img src={logoImg} alt="Logo" className="dash-logo" />
            <span className="dash-brand">Tution Mater</span>
            <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}><X size={24}/></button>
        </div>
        <nav className="sidebar-nav">
             <Link to="/dashboard" className="nav-item active"><BookOpen size={20}/> My Courses</Link>
             <button onClick={handleLogout} className="logout-btn-styled"><LogOut size={20} /> Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dash-header">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}><Menu size={24} color="white"/></button>
            <h2>My Dashboard</h2>
            <div className="user-profile">
                <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                <span className="username">{user.name}</span>
            </div>
        </header>

        {/* --- SECTION 1: ENROLLED COURSES --- */}
        <section className="my-courses">
            <h3>My Learning (Purchased)</h3>
            <div className="dash-grid">
                {enrolledList.length === 0 && <p className="no-data">You haven't enrolled in any courses yet.</p>}
                
                {enrolledList.map((course) => (
                    <div key={course._id} className="dash-card enrolled">
                        <div className="card-top">
                            <h4>{course.title}</h4>
                            <div className="progress-badge">Active</div>
                        </div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{width: `10%`}}></div>
                        </div>
                        <Link to={`/classroom/${course._id}`} className="continue-btn">
                            <PlayCircle size={18} /> Continue Learning
                        </Link>
                    </div>
                ))}
            </div>
        </section>

        {/* --- SECTION 2: AVAILABLE COURSES --- */}
        <section className="my-courses" style={{marginTop: '40px'}}>
            <h3>Explore New Batches</h3>
            <div className="dash-grid">
                {availableList.length === 0 && <p className="no-data">No new batches available.</p>}

                {availableList.map((course) => (
                    <div key={course._id} className="dash-card available">
                        <div className="card-top">
                            <h4>{course.title}</h4>
                            <div className="progress-badge new">New</div>
                        </div>
                        <p style={{color:'#94a3b8', fontSize:'0.9rem', marginBottom:'15px'}}>
                            {course.description.substring(0,60)}...
                        </p>
                        <div className="price-tag">Rs. {course.price}</div>
                        
                        {/* Go to Payment Page */}
                        <Link to={`/payment/${course._id}`} className="continue-btn buy-btn">
                            Enroll Now
                        </Link>
                    </div>
                ))}
            </div>
        </section>
      </main>
      
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;