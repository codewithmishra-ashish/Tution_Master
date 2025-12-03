import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all pages
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import VideoPlayerPage from './VideoPlayerPage';
import PaymentPage from './PaymentPage';
import CompleteProfile from './CompleteProfile'; // NEW
import AdminDashboard from './AdminDashboard';
import CreateBatch from './CreateBatch';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* STUDENT */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} /> {/* NEW */}
        <Route path="/payment/:courseId" element={<PaymentPage />} />
        <Route path="/classroom/:courseId" element={<VideoPlayerPage />} />

        {/* ADMIN / TEACHER */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-batch" element={<CreateBatch />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;