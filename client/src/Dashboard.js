import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Video, FileText, LogOut, Menu, X, PlayCircle, Clock, Calendar, Search } from 'lucide-react';
import './Dashboard.css';
import logoImg from './assets/logo.png'; 
import { API_URL } from './config';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'timetable'
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
        const res = await axios.get(`${API_URL}/courses`);
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
  const enrolledIds = (user.enrolledCourses || []).map(c => typeof c === 'object' ? c._id : c);
  const enrolledList = courses.filter(c => enrolledIds.includes(c._id));
  const availableList = courses.filter(c => !enrolledIds.includes(c._id));

  // Dummy Timetable Data (In real app, fetch from API based on batch)
  const timetable = [
    { day: "Sunday", classes: [{ subject: "Physics", time: "10:00 AM - 11:00 AM", topic: "Vector Algebra" }, { subject: "Math", time: "12:00 PM - 01:00 PM", topic: "Calculus" }] },
    { day: "Monday", classes: [{ subject: "Chemistry", time: "10:00 AM - 11:00 AM", topic: "Organic Basics" }] },
    { day: "Tuesday", classes: [{ subject: "English", time: "02:00 PM - 03:00 PM", topic: "Essay Writing" }] },
    { day: "Wednesday", classes: [{ subject: "Physics", time: "10:00 AM - 11:00 AM", topic: "Kinematics" }] },
    { day: "Thursday", classes: [{ subject: "Biology", time: "11:00 AM - 12:00 PM", topic: "Cell Division" }] },
    { day: "Friday", classes: [{ subject: "Test", time: "01:00 PM - 03:00 PM", topic: "Weekly Mock Test" }] },
  ];

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
            <button 
                onClick={() => { setActiveTab('courses'); setIsSidebarOpen(false); }} 
                className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            >
                <BookOpen size={20}/> My Learning
            </button>
            <button 
                onClick={() => { setActiveTab('timetable'); setIsSidebarOpen(false); }} 
                className={`nav-item ${activeTab === 'timetable' ? 'active' : ''}`}
            >
                <Calendar size={20}/> Timetable
            </button>
            <button className="nav-item">
                <FileText size={20}/> Notes & PDF
            </button>
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
            <h2>{activeTab === 'courses' ? 'My Dashboard' : 'Class Schedule'}</h2>
            <div className="user-profile">
                {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="avatar-img" style={{width:'35px', height:'35px', borderRadius:'50%'}} />
                ) : (
                    <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                )}
                <span className="username">{user.name}</span>
            </div>
        </header>

        {/* --- TAB CONTENT --- */}
        {activeTab === 'courses' ? (
            <>
                <div className="welcome-banner">
                    <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                    <p>You have {enrolledList.length} active courses.</p>
                </div>

                {/* 1. MY LEARNING (Enrolled) */}
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

                {/* 2. EXPLORE (Available) */}
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
                                    <p style={{color:'#94a3b8', fontSize:'0.9rem', marginBottom:'15px', minHeight:'40px'}}>
                                        {course.description ? course.description.substring(0,60) + "..." : "No description available."}
                                    </p>
                                    
                                    <div className="price-tag">Rs. {course.price}</div>
                                    
                                    {/* Link to Detail Page */}
                                    <Link to={`/course-details/${course._id}`} className="continue-btn buy-btn">
                                        View Details
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </>
        ) : (
            // --- TIMETABLE VIEW ---
            <section className="my-courses">
                <div className="dash-grid">
                    {timetable.map((day, i) => (
                        <div key={i} className="dash-card timetable-card" style={{borderLeft:'4px solid #3b82f6'}}>
                            <h4 style={{color:'white', borderBottom:'1px solid #334155', paddingBottom:'10px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px'}}>
                                <Calendar size={18} color="#3b82f6"/> {day.day}
                            </h4>
                            {day.classes.length > 0 ? day.classes.map((cls, j) => (
                                <div key={j} className="timetable-row">
                                    <div>
                                        <div style={{color:'#e2e8f0', fontWeight:'bold'}}>{cls.subject}</div>
                                        <div style={{color:'#94a3b8', fontSize:'0.8rem'}}>{cls.topic}</div>
                                    </div>
                                    <span style={{color:'#3b82f6', fontWeight:'600', fontSize:'0.9rem', background:'rgba(59,130,246,0.1)', padding:'4px 8px', borderRadius:'4px'}}>{cls.time}</span>
                                </div>
                            )) : <p style={{color:'#64748b', fontSize:'0.9rem'}}>No classes scheduled.</p>}
                        </div>
                    ))}
                </div>
            </section>
        )}
      </main>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;