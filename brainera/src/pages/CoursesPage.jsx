import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BookOpen, Users } from 'lucide-react';
import styles from '../components/Courses.module.css'; // Reusing existing card styles
import CTA from '../components/CTA';
import CourseCategories from '../components/CourseCategories';
import FAQ from '../components/FAQ';
import AuthContext from '../context/AuthContext'; // Import AuthContext

const BACKEND_BASE_URL = ''; // Use relative paths to leverage Vite proxy during dev

// Create a new style object for the page specific layout if needed,
// or mostly reuse Courses.module.css but with a different container/grid layout.
// For now, inline styles for grid container to force all items.
const CoursesPage = () => {
    const { isLoggedIn, user } = useContext(AuthContext); // Access login status and user info
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [courses, setCourses] = useState([]); // State for courses from backend
    const [loadingCourses, setLoadingCourses] = useState(true); // Loading state for courses
    const [errorCourses, setErrorCourses] = useState(null); // Error state for courses

    const [userEnrollments, setUserEnrollments] = useState([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);
    const [errorEnrollments, setErrorEnrollments] = useState(null);

    // Effect to fetch all courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses`); // Assuming /api/courses returns all courses
                if (!response.ok) {
                    throw new Error('Failed to fetch courses from API');
                }
                const data = await response.json();
                setCourses(data); // Assuming data is an array of courses
            } catch (err) {
                console.error('Error fetching courses:', err);
                setErrorCourses(err.message);
                setCourses([]);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []); // Runs once on component mount

    // Effect to fetch user enrollments
    useEffect(() => {
        const fetchEnrollments = async () => {
            if (isLoggedIn && user && user.id) {
                try {
                    const response = await fetch(`${BACKEND_BASE_URL}/api/enrollments/my-courses`, {
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // Extract courseIds from enrollments to easily check enrollment status
                        const enrolledCourseIds = data.enrollments.map(enrollment => enrollment.courseId._id);
                        setUserEnrollments(enrolledCourseIds);
                    } else {
                        console.error('Failed to fetch user enrollments:', response.statusText);
                        setUserEnrollments([]);
                    }
                } catch (error) {
                    console.error('Error fetching user enrollments:', error);
                    setUserEnrollments([]);
                }
            } else {
                setUserEnrollments([]); // Clear enrollments if not logged in
            }
            setLoadingEnrollments(false);
        };

        fetchEnrollments();
    }, [isLoggedIn, user]); // Rerun when login status or user changes

    const handleJoinCourse = (courseId) => {
        if (!isLoggedIn) {
            navigate('/login-register'); // Redirect to login/register page
        } else {
            navigate(`/checkout/${courseId}`); // Redirect to payment page
        }
    };

    const handleGoToCourse = (courseId) => {
        navigate(`/course-detail/${courseId}`); // Redirect to Course Detail page
    };

    if (loadingCourses) {
        return <p className={styles.loadingMessage}>Loading courses...</p>;
    }

    if (errorCourses) {
        return <p className={styles.errorMessage}>Error: {errorCourses}</p>;
    }

    if (courses.length === 0) {
        return <p className={styles.noCoursesMessage}>No courses available at the moment.</p>;
    }

    return (
        <>
            <PageHeader title="Courses" breadcrumb="Courses" />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.tagline}>Our Courses</span>
                        <h2 className={styles.title}>Explore Courses Crafted for Growth</h2>
                    </div>

                    <div className={styles.grid}>
                        {courses.map(course => { // Iterate over fetched courses
                            const isEnrolled = userEnrollments.includes(course._id);
                            // Determine image source: if it's a relative path, prepend backend URL
                            const imageSrc = course.thumbnail && course.thumbnail.startsWith('/')
                                ? course.thumbnail // Vite proxy handles /uploads
                                : course.thumbnail;

                            return (
                                <div key={course._id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={imageSrc}
                                            alt={course.title}
                                            className={styles.image}
                                            onError={(e) => { e.target.onerror = null; e.target.src="/vite.svg"; }} // Fallback to a placeholder
                                        />
                                    </div>
                                    <div className={styles.content}>
                                        <span className={styles.category}>{course.category}</span>
                                        <h3 className={styles.courseTitle}>{course.title}</h3>

                                        <div className={styles.meta}>
                                            <div className={styles.metaItem}>
                                                <BookOpen size={18} />
                                                <span>{course.sections} Sections</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <Users size={18} />
                                                <span>{course.students} Students</span>
                                            </div>
                                        </div>

                                        <div className={styles.footer}>
                                            <span className={styles.price}>${course.price}</span>
                                            {loadingEnrollments || errorEnrollments ? ( // Handle loading/error for enrollments
                                                <button className={styles.joinBtn} disabled>{errorEnrollments ? 'Error' : 'Loading...'}</button>
                                            ) : isEnrolled ? (
                                                <button
                                                    className={styles.goToCourseBtn} // New class for enrolled button
                                                    onClick={() => handleGoToCourse(course._id)} // Use course._id
                                                >
                                                    Go to Course
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.joinBtn}
                                                    onClick={() => handleJoinCourse(course._id)} // Use course._id
                                                >
                                                    Join Course
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <CourseCategories />
            <FAQ />
            <CTA />
        </>
    );
};

export default CoursesPage;