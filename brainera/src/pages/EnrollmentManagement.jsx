import React, { useState, useEffect } from 'react';
import styles from './EnrollmentManagement.module.css';
import adminStyles from './AdminDashboard.module.css'; // Admin dashboard layout styles
import EnrollmentCreateForm from './EnrollmentCreateForm'; // Import the new EnrollmentCreateForm

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

const EnrollmentManagement = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false); // State to control create form visibility

    const fetchEnrollments = async () => { // Moved fetchEnrollments outside useEffect for reusability
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/admin/enrollments`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            if (!response.ok) {
                let errorMessage = 'Failed to fetch enrollments';
                if (response.status === 401) {
                    errorMessage = 'Unauthorized: Please log in as an administrator.';
                } else if (response.status === 403) {
                    errorMessage = 'Forbidden: You do not have admin privileges.';
                } else {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setEnrollments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []); // Empty dependency array means this runs once on mount

    const handleDelete = async (enrollmentId) => {
        if (window.confirm('Are you sure you want to delete this enrollment?')) {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/enrollments/${enrollmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to delete enrollment');
                }
                alert('Enrollment deleted successfully!');
                fetchEnrollments(); // Refresh the list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleCreateEnrollment = async (newEnrollmentData) => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/enrollments/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(newEnrollmentData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to create enrollment');
            }
            alert('Enrollment created successfully!');
            fetchEnrollments(); // Refresh the list
            setShowCreateForm(false); // Close the create form
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCloseForm = () => {
        setShowCreateForm(false); // Close create form
    };

    if (loading) {
        return <p className={adminStyles.loadingMessage}>Loading enrollments...</p>;
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>;
    }

    return (
        <div className="container-fluid py-4">
            {!showCreateForm && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="mb-0">Enrollment Management</h2>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setShowCreateForm(true)}
                            >
                                Add Enrollment
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Course</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map((enrollment) => (
                                        <tr key={enrollment._id}>
                                            <td>{enrollment._id}</td>
                                            <td>{enrollment.studentId?.name || 'N/A'}</td>
                                            <td>{enrollment.courseId?.title || 'N/A'}</td>
                                            <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                                            <td>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(enrollment._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {showCreateForm && (
                <EnrollmentCreateForm
                    onClose={handleCloseForm}
                    onCreate={handleCreateEnrollment}
                />
            )}
        </div>
    );
};

export default EnrollmentManagement;
