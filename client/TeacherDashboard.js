import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, LogOut, Clock, Plus } from 'lucide-react';
import './Dashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([
    { id: 1, time: "10:00 AM", batch: "Class 11 Science", topic: "Vector Algebra" },
    { id: 2, time: "02:00 PM", batch: "SEE Prep", topic: "Force & Motion" },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <main className="main-content" style={{marginLeft: 0, width: '100%'}}>
        <header className="dash-header">
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <h2>Teacher Panel</h2>
            </div>
            <button onClick={handleLogout} className="logout-btn-styled" style={{width:'auto'}}>Logout</button>
        </header>

        <div className="welcome-banner" style={{background: 'linear-gradient(to right, #059669, #10b981)'}}>
            <h1>Hello, Teacher! 👨‍🏫</h1>
            <p>You have {schedule.length} classes scheduled for today.</p>
        </div>

        <section className="my-courses">
            <div className="section-top-row">
                <h3>Today's Schedule</h3>
                <button className="continue-btn" style={{width:'auto', marginTop:0}} onClick={() => alert("Open Schedule Modal")}>
                    <Plus size={18}/> Schedule Class
                </button>
            </div>

            <div className="dash-grid">
                {schedule.map(cls => (
                    <div key={cls.id} className="dash-card">
                        <div className="card-top">
                            <h4>{cls.batch}</h4>
                            <div className="progress-badge" style={{background:'#d1fae5', color:'#065f46'}}>Scheduled</div>
                        </div>
                        <div className="lesson-row" style={{marginBottom:'15px', marginTop:'10px'}}>
                            <Clock size={16} color="#10b981"/> <span style={{color:'white', fontWeight:'bold'}}>{cls.time}</span>
                        </div>
                        <p style={{color:'#94a3b8', fontSize:'0.9rem'}}>Topic: {cls.topic}</p>
                        <button className="continue-btn" style={{background:'#10b981'}}>
                            <Video size={18}/> Start Live Class
                        </button>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;