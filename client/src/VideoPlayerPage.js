import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText, MessageCircle, CheckCircle, Lock } from 'lucide-react';
import './VideoPlayerPage.css'; // We will create this next

const VideoPlayerPage = () => {
  const { courseId } = useParams(); // In real app, fetch data using this ID
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy Playlist Data
  const lessons = [
    { id: 1, title: "Introduction to Mechanics", duration: "10:05", isLocked: false, isCompleted: true },
    { id: 2, title: "Newton's Laws of Motion", duration: "45:20", isLocked: false, isCompleted: false, active: true },
    { id: 3, title: "Friction and its Types", duration: "30:15", isLocked: true, isCompleted: false },
    { id: 4, title: "Circular Motion Basics", duration: "25:00", isLocked: true, isCompleted: false },
    { id: 5, title: "Work, Energy & Power", duration: "50:10", isLocked: true, isCompleted: false },
  ];

  return (
    <div className="classroom-container">
      {/* --- TOP BAR --- */}
      <header className="classroom-header">
        <Link to="/dashboard" className="back-link">
            <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <h3 className="course-title-header">Class 11 Physics (Mechanics)</h3>
        <div className="progress-indicator">35% Complete</div>
      </header>

      <div className="classroom-grid">
        {/* --- LEFT: VIDEO PLAYER & TABS --- */}
        <div className="video-section">
            {/* 1. The Player Wrapper */}
            <div className="video-wrapper">
                {/* Embedded YouTube Video (Replace ID with real one) */}
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad1" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>

            {/* 2. Title & Tabs */}
            <div className="video-info">
                <h2>Newton's Laws of Motion</h2>
                
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                        onClick={() => setActiveTab('qa')}
                    >
                        Q&A
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notes')}
                    >
                        Notes
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-text">
                            <p>In this lecture, we will cover the three fundamental laws of motion proposed by Sir Isaac Newton. Understanding these laws is crucial for solving mechanics problems.</p>
                            <br />
                            <strong>Topics Covered:</strong>
                            <ul>
                                <li>Inertia and Mass</li>
                                <li>F = ma derivation</li>
                                <li>Action and Reaction pairs</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'qa' && (
                        <div className="qa-section">
                            <p>Ask a question to Tution Mater...</p>
                            <textarea placeholder="Type your doubt here..." rows="3"></textarea>
                            <button className="post-btn">Post Question</button>
                        </div>
                    )}
                    {activeTab === 'notes' && (
                        <div className="notes-section">
                            <div className="note-item">
                                <FileText size={20} />
                                <span>Lecture PDF - Newton's Laws</span>
                                <button className="download-btn">Download</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* --- RIGHT: PLAYLIST (LESSON LIST) --- */}
        <div className="playlist-sidebar">
            <div className="playlist-header">
                <h4>Course Content</h4>
                <span className="total-lessons">5 Lessons</span>
            </div>

            <div className="lesson-list">
                {lessons.map((lesson) => (
                    <div key={lesson.id} className={`lesson-item ${lesson.active ? 'current' : ''} ${lesson.isLocked ? 'locked' : ''}`}>
                        <div className="lesson-icon">
                            {lesson.isLocked ? <Lock size={16} /> : (lesson.isCompleted ? <CheckCircle size={16} color="#10b981"/> : <PlayCircle size={16} />)}
                        </div>
                        <div className="lesson-details">
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;