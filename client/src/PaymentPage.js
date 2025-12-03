import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Lock, ShieldCheck } from 'lucide-react';
import './PaymentPage.css'; // We will create this

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch course details to show price
    const fetchCourse = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
            setCourse(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchCourse();
  }, [courseId]);

  const handlePayment = async () => {
    setLoading(true);
    try {
        // SIMULATE PAYMENT DELAY
        setTimeout(async () => {
            // 1. Call Backend to Enroll
            const res = await axios.put(`http://localhost:5000/api/courses/enroll/${courseId}`, {
                userId: user._id
            });

            // 2. Update Local Storage with new Enrolled Data
            // We get the updated user back from the API
            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Payment Successful! Welcome to the Batch.");
            navigate('/dashboard');
        }, 2000);

    } catch (err) {
        alert("Payment Failed");
        setLoading(false);
    }
  };

  if (!course) return <div className="loading-screen">Loading Course Details...</div>;

  return (
    <div className="payment-container">
      <div className="payment-card">
        <Link to="/dashboard" className="back-link"><ArrowLeft size={18}/> Cancel</Link>
        
        <div className="payment-header">
            <h2>Complete Your Enrollment</h2>
            <p>Secure Checkout</p>
        </div>

        <div className="order-summary">
            <div className="course-preview">
                <img src={course.thumbnail || "https://placehold.co/100"} alt="Course" />
                <div>
                    <h4>{course.title}</h4>
                    <span>Lifetime Access</span>
                </div>
            </div>
            
            <div className="price-breakdown">
                <div className="row">
                    <span>Course Fee</span>
                    <span>Rs. {course.price}</span>
                </div>
                <div className="row">
                    <span>Tax (0%)</span>
                    <span>Rs. 0</span>
                </div>
                <div className="row total">
                    <span>Total</span>
                    <span>Rs. {course.price}</span>
                </div>
            </div>
        </div>

        <div className="payment-methods">
            <p>Select Payment Method:</p>
            <div className="methods-grid">
                <button className="method-btn active">eSewa</button>
                <button className="method-btn">Khalti</button>
                <button className="method-btn">FonePay</button>
            </div>
        </div>

        <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : `Pay Rs. ${course.price}`}
            {!loading && <Lock size={18} />}
        </button>

        <div className="trust-badges">
            <ShieldCheck size={16} color="#10b981"/> 100% Secure Payment
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;