import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Lock, PlayCircle, FileText } from 'lucide-react';
import './PaymentPage.css'; // Reusing payment page layout
import { API_URL } from './config';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  
  // Mock Syllabus Data (In real app, fetch from DB)
  const syllabus = [
    { title: "Unit 1: Mechanics", topics: ["Vectors", "Kinematics", "Newton's Laws"] },
    { title: "Unit 2: Heat & Thermo", topics: ["Heat Transfer", "First Law", "Carnot Engine"] },
    { title: "Unit 3: Optics", topics: ["Reflection", "Refraction", "Wave Optics"] },
  ];

  useEffect(() => {
    // Fetch basic course info
    axios.get(`${API_URL}/courses/${id}`).then(res => setCourse(res.data)).catch(console.error);
  }, [id]);

  if (!course) return <div style={{color:'white', padding:'40px'}}>Loading...</div>;

  return (
    <div className="payment-container" style={{display:'block', paddingTop:'40px'}}>
      <div className="payment-card" style={{maxWidth:'800px', margin:'0 auto'}}>
        <Link to="/dashboard" className="back-link"><ArrowLeft size={18}/> Back to Dashboard</Link>
        
        <div style={{display:'flex', gap:'30px', flexWrap:'wrap'}}>
            {/* Left: Info */}
            <div style={{flex: 1}}>
                <img src={course.thumbnail || "https://placehold.co/600x400"} alt="Course" style={{width:'100%', borderRadius:'12px', marginBottom:'20px'}}/>
                <h1 style={{color:'white', fontSize:'2rem', margin:'0 0 10px 0'}}>{course.title}</h1>
                <p style={{color:'#94a3b8', lineHeight:'1.6'}}>{course.description}</p>
                <div style={{marginTop:'20px'}}>
                    <h3 style={{color:'white'}}>What you get:</h3>
                    <ul style={{listStyle:'none', padding:0, color:'#cbd5e1'}}>
                        <li style={{marginBottom:'8px'}}>✅ Complete Video Lectures</li>
                        <li style={{marginBottom:'8px'}}>✅ PDF Notes & Assignments</li>
                        <li style={{marginBottom:'8px'}}>✅ 24/7 Doubt Support</li>
                    </ul>
                </div>
            </div>

            {/* Right: Syllabus & Action */}
            <div style={{flex: 1, background:'#0f172a', padding:'20px', borderRadius:'12px', border:'1px solid #334155'}}>
                <div style={{textAlign:'center', marginBottom:'20px'}}>
                    <h2 style={{color:'#3b82f6', fontSize:'2rem', margin:0}}>Rs. {course.price}</h2>
                    <span style={{color:'#64748b'}}>One-time payment</span>
                </div>
                
                <Link to={`/payment/${course._id}`} className="pay-now-btn" style={{marginBottom:'30px', textDecoration:'none'}}>
                    Enroll Now
                </Link>

                <h3 style={{color:'white', borderBottom:'1px solid #334155', paddingBottom:'10px'}}>Lecture Plan</h3>
                <div style={{maxHeight:'300px', overflowY:'auto'}}>
                    {syllabus.map((unit, i) => (
                        <div key={i} style={{marginBottom:'15px'}}>
                            <h4 style={{color:'#e2e8f0', margin:'0 0 5px 0'}}>{unit.title}</h4>
                            {unit.topics.map((t, j) => (
                                <div key={j} style={{display:'flex', alignItems:'center', gap:'10px', color:'#94a3b8', fontSize:'0.9rem', marginLeft:'10px', marginBottom:'5px'}}>
                                    <Lock size={14}/> {t}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;