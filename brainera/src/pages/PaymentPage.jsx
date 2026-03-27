import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from './PaymentPage.module.css'; // Will create this CSS module

const PaymentPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(AuthContext); // Get user info

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (!isLoggedIn) {
                navigate('/login-register'); // Redirect if not logged in
                return;
            }

            try {
                const response = await fetch(`/api/courses/${courseId}`); // Fetch course from backend
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data);
                } else {
                    setError('Course not found or failed to fetch details.');
                }
            } catch (err) {
                console.error('Error fetching course details:', err);
                setError('An error occurred while fetching course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId, isLoggedIn, navigate]);

    const handlePayment = async () => {
        setPaymentProcessing(true);
        setError(null);

        // Simulate payment processing
        return new Promise(resolve => setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate for mock
            if (success) {
                setPaymentSuccess(true);
                resolve({ success: true, message: 'Payment successful!' });
            } else {
                setError('Payment failed. Please try again.');
                resolve({ success: false, message: 'Payment failed.' });
            }
            setPaymentProcessing(false);
        }, 2000)); // Simulate 2 seconds processing time
    };

    const handleEnrollment = async () => {
        if (!course || !user || !isLoggedIn) {
            setError('Cannot enroll: missing course or user information.');
            return;
        }

        try {
            // Mock payment handling (replace with actual payment gateway integration)
            const paymentResult = await handlePayment();

            if (paymentResult.success) {
                // Call backend API to enroll student and save payment
                const response = await fetch('/api/enrollments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'), // Assuming token is needed
                    },
                    body: JSON.stringify({
                        userId: user.id, // Assuming user object has 'id'
                        courseId: course._id, // Use actual MongoDB _id
                        pricePaid: course.price,
                        paymentDetails: { 
                            transactionId: paymentResult.transactionId || `mock_txn_${Date.now()}`,
                            currency: 'USD'
                        },
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Course joined successfully!'); // Show message
                    navigate(`/course-detail/${course._id}`); // Redirect to Course Detail page (acting as dashboard for now)
                } else {
                    setError(data.msg || 'Enrollment failed after payment.');
                }
            }
        } catch (err) {
            console.error('Enrollment process error:', err);
            setError('An error occurred during enrollment.');
        }
    };

    if (loading) {
        return <div className={styles.container}>Loading course details...</div>;
    }

    if (error && !course) { // Only show global error if course not found
        return <div className={styles.container}><p className={styles.errorText}>{error}</p></div>;
    }

    if (!course) {
        return <div className={styles.container}><p className={styles.errorText}>Course data is unavailable.</p></div>;
    }

    return (
        <div className={styles.paymentPage}>
            <div className={styles.container}>
                <h2 className={styles.title}>Complete Your Enrollment</h2>
                {error && <p className={styles.errorText}>{error}</p>}
                
                <div className={styles.courseDetails}>
                    <h3>{course.title}</h3>
                    <p>Price: ${course.price}</p>
                    {/* Add more course details as needed */}
                </div>

                <div className={styles.paymentForm}>
                    <h4>Payment Information (Mock)</h4>
                    {/* Placeholder for a real payment form */}
                    <div className={styles.formGroup}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="**** **** **** ****" disabled={paymentProcessing} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input type="text" id="expiryDate" placeholder="MM/YY" disabled={paymentProcessing} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="***" disabled={paymentProcessing} />
                    </div>

                    <button 
                        className={styles.payButton} 
                        onClick={handleEnrollment} 
                        disabled={paymentProcessing || paymentSuccess}
                    >
                        {paymentProcessing ? 'Processing...' : paymentSuccess ? 'Payment Successful!' : 'Pay Now'}
                    </button>
                    {paymentSuccess && <p className={styles.successText}>Redirecting to course dashboard...</p>}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
