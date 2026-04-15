import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BookOpen, Users } from 'lucide-react';
import styles from '../components/Courses.module.css'; // Reusing existing card styles
import CTA from '../components/CTA';
import CourseCategories from '../components/CourseCategories';
import FAQ from '../components/FAQ';
import AuthContext from '../context/AuthContext'; // Import AuthContext

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

const CoursesPage = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [errorCourses, setErrorCourses] = useState(null);

    const [userEnrollments, setUserEnrollments] = useState([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);
    const [errorEnrollments, setErrorEnrollments] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses`);
                if (!response.ok) {
                    throw new Error('Failed to fetch courses from API');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setErrorCourses(err.message);
                setCourses([]);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

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
                setUserEnrollments([]);
            }
            setLoadingEnrollments(false);
        };

        fetchEnrollments();
    }, [isLoggedIn, user]);

    const handleJoinCourse = (courseId) => {
        if (!isLoggedIn) {
            navigate('/login-register');
        } else {
            navigate(`/checkout/${courseId}`);
        }
    };

    const handleGoToCourse = (courseId) => {
        navigate(`/course-detail/${courseId}`);
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
                        {courses.map(course => {
                            const isEnrolled = userEnrollments.includes(course._id);

                           const imageSrc = course.thumbnail
  ? course.thumbnail.startsWith('http')
    ? course.thumbnail
    : `https://learnsphere-zwzg.onrender.com${course.thumbnail.replace('/uploads/images', '/uploads')}`
  : '/vite.svg';

                            return (
                                <div key={course._id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={imageSrc}
                                            alt={course.title}
                                            className={styles.image}
                                            onError={(e) => { e.target.onerror = null; e.target.src="/vite.svg"; }}
                                        />
                                    </div>
                                    <div className={styles.content}>
                                        <span className={styles.category}>{course.category}</span>
                                        <h3 className={styles.courseTitle}>{course.title}</h3>

                                        <div className={styles.meta}>
                                            <div className={styles.metaItem}>
                                                <BookOpen size={18} />
                                                <span>{course.sections || 10} Sections</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <Users size={18} />
                                                <span>{course.students?.length || 0} Students</span>
                                            </div>
                                        </div>

                                        <div className={styles.footer}>
                                            <span className={styles.price}>${course.price}</span>
                                            {loadingEnrollments || errorEnrollments ? (
                                                <button className={styles.joinBtn} disabled>
                                                    {errorEnrollments ? 'Error' : 'Loading...'}
                                                </button>
                                            ) : isEnrolled ? (
                                                <button
                                                    className={styles.goToCourseBtn}
                                                    onClick={() => handleGoToCourse(course._id)}
                                                >
                                                    Go to Course
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.joinBtn}
                                                    onClick={() => handleJoinCourse(course._id)}
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
