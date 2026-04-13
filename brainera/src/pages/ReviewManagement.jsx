import React, { useState, useEffect } from 'react';
import styles from './ReviewManagement.module.css';
import adminStyles from './AdminDashboard.module.css';

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/reviews`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });

                const text = await response.text();

                if (!response.ok) {
                    throw new Error(text || 'Failed to fetch reviews');
                }

                const data = JSON.parse(text);
                setReviews(data);

            } catch (err) {
                console.error('Fetch Reviews Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/reviews/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });

                const text = await response.text();

                if (!response.ok) {
                    throw new Error(text || 'Failed to delete review');
                }

                setReviews(prev => prev.filter(review => review._id !== reviewId));

            } catch (err) {
                console.error('Delete Review Error:', err);
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
        <div className="container-fluid py-4">
            <div className="card">
                <div className="card-body">
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">Review Management</h2>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reviews.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No reviews found
                                        </td>
                                    </tr>
                                ) : (
                                    reviews.map((review) => (
                                        <tr key={review._id}>
                                            <td>{review._id}</td>
                                            <td>{review.studentId?.name || 'N/A'}</td>
                                            <td>{review.courseId?.title || 'N/A'}</td>
                                            <td>{review.rating}</td>
                                            <td>{review.comment}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info me-2"
                                                    disabled
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(review._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReviewManagement;
