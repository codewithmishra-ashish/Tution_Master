import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Menu, X, Facebook, Youtube, Instagram, Trophy, Calendar, Mail } from 'lucide-react';
import './LandingPage.css';

// --- IMAGES ---
import heroImg from './assets/hero-img.png';
import logoImg from './assets/logo.jpg'; 

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-container">
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="logo-container">
            <img src={logoImg} alt="Logo" className="site-logo-img" />
            <h1 className="site-logo-text">
              <span className="highlight-letter">T</span>ution 
              <span className="highlight-letter"> M</span>aster
            </h1>
        </div>
        
        {/* Desktop Links */}
        <div className="nav-links desktop-links">
          <Link to="/">Home</Link>
          <Link to="/results">Results</Link>
          <Link to="/batches">Live Classes</Link>
          <Link to="/notes">Notes</Link>
          {/* Linked to Login Page */}
          <Link to="/login">
            <button className="login-btn">Student Login</button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} color="#e2e8f0" /> : <Menu size={28} color="#e2e8f0" />}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/results" onClick={toggleMenu}>Results</Link>
          <Link to="/batches" onClick={toggleMenu}>Live Classes</Link>
          <Link to="/login" onClick={toggleMenu}>
            <button className="login-btn full-width">Student Login</button>
          </Link>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge">New Batch Starting Soon</div>
          <h1>
            Build Your Future with <br />
            <span className="highlight">Tution Mater</span>
          </h1>
          <p>
            Nepal's most trusted online learning platform. We provide high-quality video lectures, 
            notes, and test series for SEE, +2 Science, and Entrance Exams.
          </p>
          <div className="hero-buttons">
            <button className="cta-btn primary pulse-animation">
                View Courses <ArrowRight size={20} />
            </button>
            <button className="cta-btn secondary">
                Free Demo Class
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <img src={heroImg} alt="Tution Mater Teacher" />
        </div>
      </header>

      {/* --- STATS STRIP --- */}
      <section className="stats-strip">
        <div className="stat-item">
            <h2>15k+</h2> <p>Happy Students</p>
        </div>
        <div className="stat-separator"></div>
        <div className="stat-item">
            <h2>100+</h2> <p>District Toppers</p>
        </div>
        <div className="stat-separator"></div>
        <div className="stat-item">
            <h2>1M+</h2> <p>YouTube Views</p>
        </div>
      </section>

      {/* --- HALL OF FAME --- */}
      <section className="fame-section">
        <div className="section-header">
            <h2><Trophy className="inline-icon" color="#fbbf24" /> Our Hall of Fame</h2>
            <p>Consistent results in SEE and NEB Board Exams</p>
        </div>
        <div className="fame-grid">
            {/* Student 1 */}
            <div className="student-card">
                <img src="https://placehold.co/100x100/1e293b/fff?text=R" alt="Student" className="student-img"/>
                <h3>Rohan Sharma</h3>
                <p className="student-rank">GPA 4.0 (SEE 2081)</p>
                <p className="student-college">St. Xavier's Enrolled</p>
            </div>
             {/* Student 2 */}
             <div className="student-card">
                <img src="https://placehold.co/100x100/1e293b/fff?text=S" alt="Student" className="student-img"/>
                <h3>Sita Poudel</h3>
                <p className="student-rank">District Topper (Class 12)</p>
                <p className="student-college">Pulchowk Campus (IOE)</p>
            </div>
             {/* Student 3 */}
             <div className="student-card">
                <img src="https://placehold.co/100x100/1e293b/fff?text=A" alt="Student" className="student-img"/>
                <h3>Ayush KC</h3>
                <p className="student-rank">Full Scholarship</p>
                <p className="student-college">KU School of Science</p>
            </div>
             {/* Student 4 */}
             <div className="student-card">
                <img src="https://placehold.co/100x100/1e293b/fff?text=N" alt="Student" className="student-img"/>
                <h3>Nita Rai</h3>
                <p className="student-rank">GPA 3.95 (SEE 2081)</p>
                <p className="student-college">SOS Hermann Gmeiner</p>
            </div>
        </div>
      </section>

      {/* --- POPULAR COURSES --- */}
      <section className="courses-section">
        <div className="section-header">
            <h2>Suggested Courses</h2>
            <p>Start your journey with our best-selling batches</p>
        </div>
        
        <div className="course-grid">
            {/* Card 1 */}
            <div className="course-card">
                <div className="card-tag">Best Seller</div>
                <h3>SEE Bridge Course 2025</h3>
                <p className="description">Physics, Chemistry, Math & English for St. Xavier's.</p>
                <div className="divider"></div>
                <ul className="features-list">
                    <li><CheckCircle size={16} color="#3b82f6"/> Daily Live Class</li>
                    <li><CheckCircle size={16} color="#3b82f6"/> PDF Notes</li>
                </ul>
                <div className="price-row">
                    <div>
                        <span className="price">Rs. 2,500</span>
                        <span className="old-price">Rs. 5,000</span>
                    </div>
                    <button className="enroll-btn">View Details</button>
                </div>
            </div>

            {/* Card 2 */}
            <div className="course-card">
                <div className="card-tag">Trending</div>
                <h3>Class 11 Science (PCM)</h3>
                <p className="description">Complete NEB Syllabus coverage with numericals.</p>
                <div className="divider"></div>
                <ul className="features-list">
                    <li><CheckCircle size={16} color="#3b82f6"/> Chapterwise Tests</li>
                    <li><CheckCircle size={16} color="#3b82f6"/> Doubt Solving</li>
                </ul>
                <div className="price-row">
                    <div>
                        <span className="price">Rs. 4,000</span>
                        <span className="old-price">Rs. 8,000</span>
                    </div>
                    <button className="enroll-btn">View Details</button>
                </div>
            </div>

             {/* Card 3 */}
             <div className="course-card">
                <div className="card-tag">Crash Course</div>
                <h3>NEB Exam Booster</h3>
                <p className="description">Rapid revision batch for final exams.</p>
                <div className="divider"></div>
                <ul className="features-list">
                    <li><CheckCircle size={16} color="#3b82f6"/> Past Paper Solns</li>
                    <li><CheckCircle size={16} color="#3b82f6"/> Exam Strategy</li>
                </ul>
                <div className="price-row">
                    <div>
                        <span className="price">Rs. 1,500</span>
                        <span className="old-price">Rs. 3,000</span>
                    </div>
                    <button className="enroll-btn">View Details</button>
                </div>
            </div>
        </div>
      </section>

      {/* --- LATEST UPDATES --- */}
      <section className="news-section">
        <div className="section-header">
            <h2>Latest Updates</h2>
        </div>
        <div className="news-grid">
            <div className="news-item">
                <Calendar size={20} className="news-icon"/>
                <div>
                    <span className="news-date">Dec 01, 2025</span>
                    <h4>Class 11 Registration Form Open</h4>
                </div>
            </div>
            <div className="news-item">
                <Calendar size={20} className="news-icon"/>
                <div>
                    <span className="news-date">Nov 28, 2025</span>
                    <h4>New Physics Notes Uploaded for NEB</h4>
                </div>
            </div>
            <div className="news-item">
                <Calendar size={20} className="news-icon"/>
                <div>
                    <span className="news-date">Nov 15, 2025</span>
                    <h4>St. Xavier's Entrance Exam Date Announced</h4>
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        {/* Newsletter */}
        <div className="newsletter-container">
            <div className="newsletter-content">
                <h3>Stay Updated</h3>
                <p>Subscribe to get notes and exam alerts.</p>
            </div>
            <div className="newsletter-input">
                <input type="email" placeholder="Enter your email" />
                <button><Mail size={18}/></button>
            </div>
        </div>

        <div className="footer-content">
            <div className="footer-col brand-col">
                <div className="logo-container footer-logo-container">
                    <img src={logoImg} alt="Logo" className="site-logo-img small-img" />
                    <h2 className="site-logo-text footer-text-logo">Tution Mater</h2>
                </div>
                <div className="social-icons">
                    <Facebook className="social-icon" />
                    <Youtube className="social-icon" />
                    <Instagram className="social-icon" />
                </div>
            </div>

            <div className="footer-col hide-on-mobile">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/results">Results</Link>
            </div>

            <div className="footer-col hide-on-mobile">
                <h4>Courses</h4>
                <Link to="/course/see">SEE Prep</Link>
                <Link to="/course/11">Class 11</Link>
                <Link to="/course/12">Class 12</Link>
            </div>

            <div className="footer-col">
                <h4>Contact</h4>
                <p>📍 Kathmandu, Nepal</p>
                <p>📞 +977 9800000000</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 Tution Mater. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;