import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Users, Settings, LogOut, DollarSign, BookOpen, Edit, Trash2 } from 'lucide-react';
import './Dashboard.css'; // Reusing the Dashboard styles for consistency
import logoImg from './assets/logo.jpg'; 

const AdminDashboard = () => {
  // Dummy Data for Admin
  const stats = [
    { label: "Total Revenue", value: "Rs. 1.2L", icon: <DollarSign size={24} color="#10b981"/> },
    { label: "Total Students", value: "1,250", icon: <Users size={24} color="#3b82f6"/> },
    { label: "Active Batches", value: "8", icon: <BookOpen size={24} color="#f59e0b"/> },
  ];

  const myBatches = [
    { id: 1, title: "SEE Bridge Course 2025", students: 450, price: "Rs. 2,500", status: "Active" },
    { id: 2, title: "Class 11 Physics (Mechanics)", students: 200, price: "Rs. 4,000", status: "Active" },
    { id: 3, title: "IOE Entrance Prep", students: 0, price: "Rs. 8,000", status: "Draft" },
  ];

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
            <Link to="/admin/students" className="nav-item"><Users size={20}/> Students</Link>
            <Link to="/profile" className="nav-item"><Settings size={20}/> Profile & Settings</Link>
        </nav>

        <div className="sidebar-footer">
            <Link to="/" className="logout-btn"><LogOut size={20} /> Logout</Link>
        </div>
      </aside>

      {/* --- ADMIN CONTENT --- */}
      <main className="main-content">
        <header className="dash-header">
            <h2>Teacher Dashboard</h2>
            <Link to="/profile" className="user-profile">
                <div className="avatar">T</div>
                <span className="username">Tution Mater</span>
            </Link>
        </header>

        {/* 1. Stats Row */}
        <div className="stats-row">
            {stats.map((stat, index) => (
                <div key={index} className="stat-box">
                    <div className="stat-icon-bg">{stat.icon}</div>
                    <div>
                        <h4>{stat.value}</h4>
                        <p>{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* 2. Manage Batches Section */}
        <section className="my-courses">
            <div className="section-top-row">
                <h3>Your Batches</h3>
                <Link to="/admin/create-batch">
                    <button className="continue-btn" style={{width: 'auto', marginTop: 0}}>
                        <PlusCircle size={18} style={{marginRight: '8px'}}/> Create New
                    </button>
                </Link>
            </div>

            {/* Admin Table Layout for Batches */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Batch Name</th>
                            <th>Students</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBatches.map((batch) => (
                            <tr key={batch.id}>
                                <td>{batch.title}</td>
                                <td>{batch.students}</td>
                                <td>{batch.price}</td>
                                <td>
                                    <span className={`status-badge ${batch.status.toLowerCase()}`}>
                                        {batch.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="icon-btn edit"><Edit size={16}/></button>
                                        <button className="icon-btn delete"><Trash2 size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;