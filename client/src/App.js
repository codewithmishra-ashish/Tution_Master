import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import VideoPlayerPage from './VideoPlayerPage'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* New Route with a dynamic ID parameter */}
        <Route path="/classroom/:courseId" element={<VideoPlayerPage />} />
      </Routes>
    </Router>
  );
}

export default App;