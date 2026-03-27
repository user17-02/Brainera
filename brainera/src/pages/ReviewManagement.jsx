import React, { useState, useEffect } from 'react';
import styles from './ReviewManagement.module.css';
import adminStyles from './AdminDashboard.module.css'; // Admin dashboard layout styles

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/admin/reviews', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
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
                const response = await fetch(`/api/admin/reviews/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete review');
                }
                setReviews(reviews.filter(review => review._id !== reviewId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid py-4"> {/* Use Bootstrap container for main content area padding */}
            <div className="card"> {/* Bootstrap card for the entire management section */}
                <div className="card-body"> {/* Card body for padding */}
                    <div className="d-flex justify-content-between align-items-center mb-3"> {/* Bootstrap for title and button alignment */}
                        <h2 className="mb-0">Review Management</h2> {/* mb-0 to remove bottom margin */}
                        {/* No "Add Review" button in original, so not adding */}
                    </div>
                    <div className="table-responsive"> {/* For responsive tables */}
                                                <table className="table table-striped table-hover"><thead><tr><th>ID</th><th>Student</th><th>Course</th><th>Rating</th><th>Comment</th><th>Actions</th></tr></thead><tbody>{reviews.map((review) => (<tr key={review._id}><td>{review._id}</td><td>{review.studentId?.name || 'N/A'}</td><td>{review.courseId?.title || 'N/A'}</td><td>{review.rating}</td><td>{review.comment}</td><td><button className="btn btn-sm btn-info me-2" disabled>Edit</button><button className="btn btn-sm btn-danger" onClick={() => handleDelete(review._id)}>Delete</button></td></tr>))}</tbody></table>                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewManagement;
