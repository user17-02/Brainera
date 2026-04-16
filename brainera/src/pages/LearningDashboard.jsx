import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Users } from 'lucide-react';
import styles from './LearningDashboard.module.css';
import CoursesStyles from '../components/Courses.module.css';
import AuthContext from '../context/AuthContext';

//  IMPORTANT: Use your backend Render URL
const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

const LearningDashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login-register');
            return;
        }

        const fetchEnrolledCourses = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_BASE_URL}/api/enrollments/my-courses`,
                    {
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    }
                );

                //  SAFE ERROR HANDLING (fix JSON crash)
                if (!response.ok) {
                    let errorMessage = 'Failed to fetch enrolled courses';

                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch {
                        const text = await response.text();
                        errorMessage = text || errorMessage;
                    }

                    throw new Error(errorMessage);
                }

                const data = await response.json();

                if (data.enrollments && Array.isArray(data.enrollments)) {
                    const courses = data.enrollments.map(enrollment => ({
                        ...enrollment.courseId,
                        enrolledAt: enrollment.enrolledAt,
                        paymentStatus: enrollment.payment?.status,
                        enrollmentId: enrollment._id
                    }));

                    setEnrolledCourses(courses);
                } else {
                    setEnrolledCourses([]);
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
        navigate(`/course-detail/${courseId}`);
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

            <section className={CoursesStyles.section}>
                <div className={CoursesStyles.container}>
                    <div className={CoursesStyles.header}>
                        <h2 className={CoursesStyles.title}>Your Enrolled Courses</h2>
                    </div>

                    {enrolledCourses.length === 0 ? (
                        <p className={styles.noCoursesMessage}>
                            You are not currently enrolled in any courses.
                            Browse our <a href="/courses">available courses</a>.
                        </p>
                    ) : (
                        <div className={CoursesStyles.grid}>
                            {enrolledCourses.map(course => {

                                //  FIX IMAGE URL (VERY IMPORTANT)
                                const imageSrc = course.thumbnail
                                    ? course.thumbnail.startsWith('/')
                                        ? `${BACKEND_BASE_URL}${course.thumbnail}`
                                        : course.thumbnail
                                    : '/vite.svg';

                                return (
                                    <div key={course._id} className={CoursesStyles.card}>
                                        <div className={CoursesStyles.imageWrapper}>
                                            <img
                                                src={imageSrc}
                                                alt={course.title}
                                                className={CoursesStyles.image}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/vite.svg";
                                                }}
                                            />
                                        </div>

                                        <div className={CoursesStyles.content}>
                                            <span className={CoursesStyles.category}>
                                                {course.category}
                                            </span>

                                            <h3 className={CoursesStyles.courseTitle}>
                                                {course.title}
                                            </h3>

                                            <div className={CoursesStyles.meta}>
                                                {course.instructor?.name && (
                                                    <div className={CoursesStyles.metaItem}>
                                                        <Users size={18} />
                                                        <span>
                                                            {course.instructor.name} (Instructor)
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {course.description && (
                                                <p className={styles.courseDescription}>
                                                    {course.description.substring(0, 100)}...
                                                </p>
                                            )}

                                            <div className={CoursesStyles.footer}>
                                                <span className={CoursesStyles.price}>
                                                    ${course.price}
                                                </span>

                                                <button
                                                    className={CoursesStyles.goToCourseBtn}
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
