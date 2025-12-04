import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Search, Mail, Phone, UserCheck, XCircle } from 'lucide-react';
import './Dashboard.css'; // Using existing dashboard styles
import { API_URL } from './config';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Security Check: Only Admin can view this
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 'admin') navigate('/login');

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API_URL}/users`);
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchStudents();
  }, [navigate]);

  // Filter logic for Search Bar
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
       <div className="create-batch-container" style={{width: '100%', maxWidth: '1200px', margin: '0 auto'}}>
        <header className="page-header">
            <Link to="/admin" className="back-btn"><ArrowLeft size={20} /> Back to Dashboard</Link>
            <h2>Student Management ({filteredStudents.length})</h2>
        </header>

        {/* Search Bar */}
        <div style={{marginBottom:'20px', position:'relative', maxWidth: '400px'}}>
            <Search size={20} style={{position:'absolute', top:'12px', left:'15px', color:'#94a3b8'}}/>
            <input 
                type="text" 
                placeholder="Search by name or email..." 
                style={{width:'100%', padding:'12px 12px 12px 45px', background:'#1e293b', border:'1px solid #334155', color:'white', borderRadius:'8px', outline: 'none'}}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="admin-table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Enrolled Batches</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? filteredStudents.map(student => (
                        <tr key={student._id}>
                            <td>
                                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                    <div className="avatar" style={{width:'35px', height:'35px', fontSize:'0.9rem', background: '#3b82f6'}}>{student.name.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <div style={{fontWeight:'bold'}}>{student.name}</div>
                                        <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>{student.role}</div>
                                    </div>
                                </div>
                            </td>
                            <td style={{fontSize:'0.9rem'}}>
                                <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom: '4px'}}><Mail size={14} color="#94a3b8"/> {student.email}</div>
                                {student.phone && <div style={{display:'flex', gap:'8px', alignItems:'center'}}><Phone size={14} color="#94a3b8"/> {student.phone}</div>}
                            </td>
                            <td>
                                <span className="progress-badge" style={{background: '#1e293b', border: '1px solid #334155'}}>
                                    {student.enrolledCourses ? student.enrolledCourses.length : 0} Courses
                                </span>
                            </td>
                            <td>
                                {student.isProfileComplete ? 
                                    <span style={{color:'#10b981', display:'flex', alignItems:'center', gap:'5px', fontSize: '0.85rem'}}><UserCheck size={16}/> Verified</span> : 
                                    <span style={{color:'#f59e0b', display:'flex', alignItems:'center', gap:'5px', fontSize: '0.85rem'}}><XCircle size={16}/> Incomplete</span>
                                }
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>No students found matching your search.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;