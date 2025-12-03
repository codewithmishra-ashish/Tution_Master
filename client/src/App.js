import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import VideoPlayerPage from './VideoPlayerPage';
import AdminDashboard from './AdminDashboard'; // Import
import CreateBatch from './CreateBatch'; // Import
import ProfilePage from './ProfilePage'; // Import

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classroom/:courseId" element={<VideoPlayerPage />} />

        {/* Admin/Teacher Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-batch" element={<CreateBatch />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;