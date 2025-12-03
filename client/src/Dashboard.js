import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link is imported here
import { BookOpen, Video, FileText, LogOut, Menu, X, PlayCircle, Clock } from 'lucide-react';
import './Dashboard.css';
import logoImg from './assets/logo.jpg'; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dummy Data
  const myCourses = [
    { id: 1, title: "SEE Bridge Course 2025", progress: 65, nextLesson: "Force & Motion - Part 2" },
    { id: 2, title: "Class 11 Physics (Mechanics)", progress: 30, nextLesson: "Vectors & Scalars" },
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

        {/* FIXED NAVIGATION SECTION */}
        <nav className="sidebar-nav">
            {/* Replaced <a> with <Link> to fix ESLint warnings */}
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
            <Link to="/" className="logout-btn">
                <LogOut size={20} /> Logout
            </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        {/* Top Header */}
        <header className="dash-header">
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} color="white" />
            </button>
            <h2>My Dashboard</h2>
            <div className="user-profile">
                <div className="avatar">S</div>
                <span className="username">Student Name</span>
            </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-banner">
            <h1>Welcome back, Student! 👋</h1>
            <p>You have 2 lessons pending today.</p>
        </div>

        {/* My Courses Grid */}
        <section className="my-courses">
            <h3>Enrolled Courses</h3>
            <div className="dash-grid">
                {myCourses.map((course) => (
                    <div key={course.id} className="dash-card">
                        <div className="card-top">
                            <h4>{course.title}</h4>
                            <div className="progress-badge">{course.progress}% Completed</div>
                        </div>
                        
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{width: `${course.progress}%`}}></div>
                        </div>

                        <div className="next-up">
                            <small>Next Lesson:</small>
                            <div className="lesson-row">
                                <PlayCircle size={16} color="#3b82f6" />
                                <span>{course.nextLesson}</span>
                            </div>
                        </div>
                        <br></br>
                        <Link to={`/classroom/${course.id}`} className="continue-btn">
    Continue Learning
</Link>
                    </div>
                ))}

                {/* Upsell Card */}
                <div className="dash-card add-new">
                    <div className="add-icon">+</div>
                    <h4>Enroll in New Course</h4>
                    <p>Browse our catalog</p>
                    <Link to="/batches" className="browse-link">Browse All</Link>
                </div>
            </div>
        </section>

        {/* Recent Activity / Stats */}
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
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;