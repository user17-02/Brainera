import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import styles from './InstructorEnrolledStudents.module.css'; // Component-specific styles
import adminStyles from './AdminDashboard.module.css'; // Reusing some admin table styles
import AuthContext from '../context/AuthContext';

const BACKEND_BASE_URL = 'http://localhost:5000'; // Ensure this matches your backend URL

const InstructorEnrolledStudents = () => {
    const { courseId } = useParams(); // Get courseId from URL
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useContext(AuthContext);

    const [courseTitle, setCourseTitle] = useState('Loading Course...');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn || user?.role !== 'instructor') {
            navigate('/login-register'); // Redirect if not logged in or not an instructor
            return;
        }

        if (!courseId) {
            setError('Course ID is missing from the URL. Please navigate from a valid course page.');
            setLoading(false);
            return;
        }

        const fetchEnrolledStudents = async () => {
            try {
                // First, fetch course details to get the title
                const courseResponse = await fetch(`/api/courses/${courseId}`);
                if (!courseResponse.ok) {
                    throw new Error('Failed to fetch course title.');
                }
                const courseData = await courseResponse.json();
                setCourseTitle(courseData.title);

                // Then, fetch enrolled students for this course
                const studentsResponse = await fetch(`/api/enrollments/course/${courseId}/students`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!studentsResponse.ok) {
                    const errorData = await studentsResponse.json();
                    throw new Error(errorData.msg || 'Failed to fetch enrolled students.');
                }

                const data = await studentsResponse.json();
                setEnrolledStudents(data.students || []);

            } catch (err) {
                console.error('Error fetching enrolled students:', err);
                setError(err.message);
                // Optionally log out user if token is invalid or unauthorized
                if (err.message.includes('Unauthorized') || err.message.includes('Access denied')) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [courseId, isLoggedIn, user, navigate, logout]);

    if (loading) {
        return <p className={adminStyles.loadingMessage}>Loading enrolled students...</p>;
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>;
    }

    return (
        <>
            <PageHeader title={`Students for: ${courseTitle}`} breadcrumb="Enrolled Students" />

            <section className={styles.studentsSection}>
                <div className="container-fluid">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className={styles.sectionTitle}>Enrolled Students for "{courseTitle}"</h2>

                            {enrolledStudents.length === 0 ? (
                                <p className={styles.noStudentsMessage}>No students are currently enrolled in this course.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Email</th>
                                                <th>Enrolled At</th>
                                                <th>Payment Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enrolledStudents.map((student) => (
                                                <tr key={student.studentId}>
                                                    <td className="fw-bold">{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{new Date(student.enrolledAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <span className={`badge ${student.paymentStatus === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                            {student.paymentStatus}
                                                        </span>
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

export default InstructorEnrolledStudents;
