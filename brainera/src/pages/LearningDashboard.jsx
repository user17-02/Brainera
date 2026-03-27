import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BookOpen, Users } from 'lucide-react';
import styles from './LearningDashboard.module.css'; // Component-specific styles
import CoursesStyles from '../components/Courses.module.css'; // Reusing general card styles
import AuthContext from '../context/AuthContext';

const BACKEND_BASE_URL = ''; // Uses relative paths for Vite proxy support

const LearningDashboard = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login-register'); // Redirect if not logged in
            return;
        }

        const fetchEnrolledCourses = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/enrollments/my-courses`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to fetch enrolled courses.');
                }

                const data = await response.json();
                // Ensure data.enrollments exists and is an array
                if (data.enrollments && Array.isArray(data.enrollments)) {
                    // Extract the course objects from the enrollments
                    const courses = data.enrollments.map(enrollment => ({
                        ...enrollment.courseId, // Spread course details
                        enrolledAt: enrollment.enrolledAt,
                        paymentStatus: enrollment.payment.status,
                        enrollmentId: enrollment._id // Keep enrollment ID if needed
                    }));
                    setEnrolledCourses(courses);
                } else {
                    setEnrolledCourses([]); // No enrollments or unexpected data format
                }

            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [isLoggedIn, navigate]);

    const handleGoToCourse = (courseId) => {
        navigate(`/course-detail/${courseId}`); // Redirect to Course Detail page
    };

    if (loading) {
        return <p className={styles.loadingMessage}>Loading your courses...</p>;
    }

    if (error) {
        return <p className={styles.errorMessage}>Error: {error}</p>;
    }

    return (
        <>
            <PageHeader title="My Learning" breadcrumb="My Learning" />

            <section className={CoursesStyles.section}> {/* Reusing section styling */}
                <div className={CoursesStyles.container}> {/* Reusing container styling */}
                    <div className={CoursesStyles.header}>
                        <h2 className={CoursesStyles.title}>Your Enrolled Courses</h2>
                    </div>

                    {enrolledCourses.length === 0 ? (
                        <p className={styles.noCoursesMessage}>You are not currently enrolled in any courses. Browse our <a href="/courses">available courses</a> to get started!</p>
                    ) : (
                        <div className={CoursesStyles.grid}> {/* Reusing grid styling */}
                            {enrolledCourses.map(course => {
                                // Determine image source: if it's a relative path, prepend backend URL
                                const imageSrc = course.thumbnail && course.thumbnail.startsWith('/')
                                    ? course.thumbnail // Vite proxy handles /uploads
                                    : course.thumbnail;

                                return (
                                    <div key={course._id} className={CoursesStyles.card}> {/* Reusing card styling */}
                                        <div className={CoursesStyles.imageWrapper}> {/* Reusing image wrapper styling */}
                                            <img
                                                src={imageSrc}
                                                alt={course.title}
                                                className={CoursesStyles.image} // Reusing image styling
                                                onError={(e) => { e.target.onerror = null; e.target.src="/vite.svg"; }} // Fallback
                                            />
                                        </div>
                                        <div className={CoursesStyles.content}> {/* Reusing content styling */}
                                            <span className={CoursesStyles.category}>{course.category}</span>
                                            <h3 className={CoursesStyles.courseTitle}>{course.title}</h3>

                                            <div className={CoursesStyles.meta}> {/* Reusing meta styling */}
                                                {/* Displaying instructor name as meta item */}
                                                {course.instructor && course.instructor.name && (
                                                    <div className={CoursesStyles.metaItem}>
                                                        <Users size={18} /> {/* Using Users icon for instructor */}
                                                        <span>{course.instructor.name} (Instructor)</span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Optionally display description */}
                                            {course.description && (
                                                <p className={styles.courseDescription}>{course.description.substring(0, 100)}...</p>
                                            )}

                                            <div className={CoursesStyles.footer}> {/* Reusing footer styling */}
                                                <span className={CoursesStyles.price}>${course.price}</span>
                                                <button
                                                    className={CoursesStyles.goToCourseBtn} // New class for enrolled button
                                                    onClick={() => handleGoToCourse(course._id)}
                                                >
                                                    Go to Course
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default LearningDashboard;