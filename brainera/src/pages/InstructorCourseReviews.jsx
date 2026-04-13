import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import styles from './InstructorCourseReviews.module.css'; // Component-specific styles
import adminStyles from './AdminDashboard.module.css'; // Reusing admin table styles
import AuthContext from '../context/AuthContext'; // Import AuthContext

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com'; // Ensure this matches your backend URL

const InstructorCourseReviews = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useContext(AuthContext);

    const [reviews, setReviews] = useState([]);
    const [courseTitle, setCourseTitle] = useState('Loading Course...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch course title and reviews
    useEffect(() => {
        if (!isLoggedIn || user?.role !== 'instructor') {
            navigate('/login-register');
            return;
        }

        if (!courseId) {
            setError('Course ID is missing.');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch course details for title
                const courseResponse = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}`);
                if (!courseResponse.ok) {
                    throw new Error('Failed to fetch course title.');
                }
                const courseData = await courseResponse.json();
                setCourseTitle(courseData.title);

                // Fetch reviews for this specific course
                const reviewsResponse = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/reviews`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews.');
                }
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                if (err.message.includes('Unauthorized') || err.message.includes('Access denied')) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, isLoggedIn, user, navigate, logout]);


    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                // Instructor can only delete reviews for their own courses
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/reviews/${reviewId}`,  {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to delete review.');
                }
                // Update reviews list
                setReviews(reviews.filter(review => review._id !== reviewId));
            } catch (err) {
                console.error('Error deleting review:', err);
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <p className={adminStyles.loadingMessage}>Loading reviews...</p>;
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>;
    }

    return (
        <>
            <PageHeader title={`Reviews for: ${courseTitle}`} breadcrumb="My Courses / Reviews" />

            <section className={styles.reviewsSection}>
                <div className="container-fluid">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className={styles.sectionTitle}>Reviews for "{courseTitle}"</h2>

                            {reviews.length === 0 ? (
                                <p className={styles.noReviewsMessage}>No reviews have been submitted for this course yet.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Rating</th>
                                                <th>Comment</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reviews.map((review) => (
                                                <tr key={review._id}>
                                                    <td className="fw-bold">{review.studentId?.name || 'N/A'}</td>
                                                    <td>
                                                        <span className="text-warning">{'⭐'.repeat(review.rating)}</span>
                                                        <span className="text-muted ms-1">({review.rating}/5)</span>
                                                    </td>
                                                    <td>{review.comment}</td>
                                                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteReview(review._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InstructorCourseReviews;
