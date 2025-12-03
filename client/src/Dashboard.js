import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Video, FileText, LogOut, Menu, X, PlayCircle, Clock } from 'lucide-react';
import './Dashboard.css';
import logoImg from './assets/logo.jpg'; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  
  // 1. Get User Data
  const user = JSON.parse(localStorage.getItem("user"));

  // 2. Protect & Validate Route
  useEffect(() => {
    if (!user) {
        navigate('/login');
    } else if (user.role === 'student' && !user.isProfileComplete) {
        // Force profile completion for new students
        navigate('/complete-profile');
    } else {
        // User is valid, fetch courses
        fetchCourses();
    }
  }, [user, navigate]);

  // 3. Fetch Courses Function
  const fetchCourses = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
    } catch (err) {
        console.error("Error fetching courses:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Avoid rendering if not logged in
  if (!user) return null;

  // Filter Courses Logic
  // enrolledCourses might be an array of objects or strings depending on population, handled safely here
  const enrolledIds = (user.enrolledCourses || []).map(c => typeof c === 'object' ? c._id : c);
  
  const enrolledList = courses.filter(c => enrolledIds.includes(c._id));
  const availableList = courses.filter(c => !enrolledIds.includes(c._id));

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            <img src={logoImg} alt="Logo" className="dash-logo" />
            <span className="dash-brand">Tution Mater</span>
            <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
            </button>
        </div>

        <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item active">
                <BookOpen size={20}/> My Courses
            </Link>
            <Link to="/batches" className="nav-item">
                <Video size={20}/> Live Classes
            </Link>
            <Link to="/notes" className="nav-item">
                <FileText size={20}/> Notes & PDF
            </Link>
        </nav>

        <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn-styled">
                <LogOut size={20} /> Logout
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="dash-header">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} color="white" />
            </button>
            <h2>My Dashboard</h2>
            <div className="user-profile">
                {/* Profile Pic or Initials */}
                {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="avatar-img" style={{width:'35px', height:'35px', borderRadius:'50%'}} />
                ) : (
                    <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                )}
                <span className="username">{user.name}</span>
            </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-banner">
            <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p>You have {enrolledList.length} active courses.</p>
        </div>

        {/* --- SECTION 1: MY LEARNING (Purchased) --- */}
        <section className="my-courses">
            <h3>My Learning</h3>
            <div className="dash-grid">
                {enrolledList.length === 0 ? (
                    <p className="no-data">You are not enrolled in any courses yet.</p>
                ) : (
                    enrolledList.map((course) => (
                        <div key={course._id} className="dash-card enrolled">
                            <div className="card-top">
                                <h4>{course.title}</h4>
                                <div className="progress-badge">Active</div>
                            </div>
                            
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{width: `15%`}}></div>
                            </div>

                            <div className="next-up">
                                <small>Next Lesson:</small>
                                <div className="lesson-row">
                                    <PlayCircle size={16} color="#3b82f6" />
                                    <span>Intro to {course.category || 'Topic'}</span>
                                </div>
                            </div>

                            <Link to={`/classroom/${course._id}`} className="continue-btn">
                                Continue Learning
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>

        {/* --- SECTION 2: EXPLORE (Available) --- */}
        <section className="my-courses" style={{marginTop: '40px'}}>
            <h3>Explore New Batches</h3>
            <div className="dash-grid">
                {availableList.length === 0 ? (
                    <p className="no-data">No new batches available at the moment.</p>
                ) : (
                    availableList.map((course) => (
                        <div key={course._id} className="dash-card available">
                            <div className="card-top">
                                <h4>{course.title}</h4>
                                <div className="progress-badge new">New</div>
                            </div>
                            <p style={{color:'#94a3b8', fontSize:'0.9rem', marginBottom:'15px'}}>
                                {course.description ? course.description.substring(0,60) + "..." : "No description available."}
                            </p>
                            
                            <div className="price-tag">Rs. {course.price}</div>
                            
                            {/* Go to Payment Page */}
                            <Link to={`/payment/${course._id}`} className="continue-btn buy-btn">
                                Enroll Now
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>

        {/* Recent Activity Stats */}
        <section className="stats-row">
            <div className="stat-box">
                <Clock size={24} color="#3b82f6" />
                <div>
                    <h4>12.5 Hrs</h4>
                    <p>Watch Time</p>
                </div>
            </div>
            <div className="stat-box">
                <FileText size={24} color="#3b82f6" />
                <div>
                    <h4>5</h4>
                    <p>Notes Downloaded</p>
                </div>
            </div>
        </section>
      </main>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;