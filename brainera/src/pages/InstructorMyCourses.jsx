import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BookOpen, Users } from 'lucide-react';
import styles from './InstructorMyCourses.module.css'; // Component-specific styles
import CoursesStyles from '../components/Courses.module.css'; // Reusing general card styles
import AuthContext from '../context/AuthContext';
import CourseEditForm from '../pages/CourseEditForm'; // Import the CourseEditForm
import CourseCreateForm from '../pages/CourseCreateForm'; // Import the CourseCreateForm

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com'; // Ensure this matches your backend URL

const InstructorMyCourses = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseToEdit, setCourseToEdit] = useState(null); // State to hold course being edited
    const [showEditForm, setShowEditForm] = useState(false); // State to control edit form visibility
    const [showCreateForm, setShowCreateForm] = useState(false); // State to control create form visibility

    const fetchMyCourses = async () => {
        if (!isLoggedIn || (user?.role !== 'instructor' && user?.role !== 'admin')) {
            navigate('/login-register'); // Redirect if not logged in, not an instructor, AND not an admin
            return;
        }
        try {
            const response = await fetch('/api/courses/my-courses', {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to fetch your courses.');
            }

            const data = await response.json();
            setMyCourses(data);

        } catch (err) {
            console.error('Error fetching instructor courses:', err);
            setError(err.message);
            // Optionally log out user if token is invalid
            if (err.message.includes('Unauthorized')) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyCourses();
    }, [isLoggedIn, user, navigate, logout]);

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                const response = await fetch(`/api/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to delete course');
                }
                alert('Course deleted successfully!');
                fetchMyCourses(); // Refresh the list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEditClick = (course) => {
        setCourseToEdit(course);
        setShowEditForm(true);
    };

    const handleSaveEdit = async (courseId, updatedData) => {
        let bodyContent;
        const headers = {
            'x-auth-token': localStorage.getItem('token'),
        };

        if (updatedData.imageFile) {
            const formData = new FormData();
            for (const key in updatedData) {
                if (key === 'existingThumbnail') continue;
                formData.append(key, updatedData[key]);
            }
            bodyContent = formData;
        } else {
            headers['Content-Type'] = 'application/json';
            const { imageFile, existingThumbnail, ...rest } = updatedData;
            bodyContent = JSON.stringify(rest);
        }

        try {
            const response = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: headers,
                body: bodyContent,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to update course');
            }
            alert('Course updated successfully!');
            fetchMyCourses(); // Refresh the list
            setShowEditForm(false);
            setCourseToEdit(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateCourse = async (newCourseData) => {
        let bodyContent;
        const headers = {
            'x-auth-token': localStorage.getItem('token'),
        };

        if (newCourseData.imageFile) {
            const formData = new FormData();
            for (const key in newCourseData) {
                if (key === 'existingThumbnail') continue;
                formData.append(key, newCourseData[key]);
            }
            bodyContent = formData;
        } else {
            headers['Content-Type'] = 'application/json';
            const { imageFile, existingThumbnail, ...rest } = newCourseData;
            bodyContent = JSON.stringify(rest);
        }

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: headers,
                body: bodyContent,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to create course');
            }
            alert('Course created successfully!');
            fetchMyCourses(); // Refresh the list
            setShowCreateForm(false); // Close the create form
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCloseForm = () => {
        setShowEditForm(false);
        setCourseToEdit(null);
        setShowCreateForm(false);
    };

    if (loading) {
        return <p className={styles.loadingMessage}>Loading your courses...</p>;
    }

    if (error) {
        return <p className={styles.errorMessage}>Error: {error}</p>;
    }

    return (
        <>
            <PageHeader title="My Courses" breadcrumb="My Courses" />

            <section className={CoursesStyles.section}> {/* Reusing section styling */}
                <div className={CoursesStyles.container}> {/* Reusing container styling */}
                    <div className={CoursesStyles.header}>
                        <h2 className={CoursesStyles.title}>Manage Your Courses</h2>
                        <button
                            className="btn btn-primary" // Bootstrap primary button
                            onClick={() => setShowCreateForm(true)}
                        >
                            Create New Course
                        </button>
                    </div>

                    {myCourses.length === 0 ? (
                        <p className={styles.noCoursesMessage}>You have not created any courses yet. <button className={styles.createFirstCourseBtn} onClick={() => setShowCreateForm(true)}>Create your first course!</button></p>
                    ) : (
                        <div className={CoursesStyles.grid}> {/* Reusing grid styling */}
                            {myCourses.map(course => {
                                // Determine image source: if it's a relative path, prepend backend URL
                                const imageSrc = course.thumbnail && course.thumbnail.startsWith('/')
                                    ? `${BACKEND_BASE_URL}${course.thumbnail}`
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

                                            <div className={CoursesStyles.meta}>
                                                {course.instructor && course.instructor.name && (
                                                    <div className={CoursesStyles.metaItem}>
                                                        <Users size={18} />
                                                        <span>{course.instructor.name} (Instructor)</span>
                                                    </div>
                                                )}
                                                <div className={CoursesStyles.metaItem}>
                                                    <BookOpen size={18} />
                                                    <span>Status: {course.status}</span>
                                                </div>
                                                {/* Display Review Summary */}
                                                {(course.averageRating !== null && course.averageRating !== undefined) && (
                                                    <div className={CoursesStyles.metaItem}>
                                                        <span className={styles.ratingStars}>⭐</span>
                                                        <span>{parseFloat(course.averageRating).toFixed(1)} ({course.reviewCount} reviews)</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={CoursesStyles.footer}> {/* Reusing footer styling */}
                                                <span className={CoursesStyles.price}>${course.price}</span>
                                                <div className={styles.courseActions}>
                                                    <button
                                                        className={`${CoursesStyles.joinBtn} ${styles.editBtn}`}
                                                        onClick={() => handleEditClick(course)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={`${CoursesStyles.joinBtn} ${styles.deleteBtn}`}
                                                        onClick={() => handleDelete(course._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link to={`/instructor/my-courses/${course._id}/students`} className={`${CoursesStyles.joinBtn} ${styles.viewStudentsBtn}`}>
                                                        View Students
                                                    </Link>
                                                    <Link to={`/instructor/my-courses/${course._id}/reviews`} className={`${CoursesStyles.joinBtn} ${styles.viewReviewsBtn}`}>
                                                        View Reviews
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {showEditForm && courseToEdit && (
                <CourseEditForm
                    course={courseToEdit}
                    onClose={handleCloseForm}
                    onSave={handleSaveEdit}
                    currentUser={user} // Pass the current user to the form
                />
            )}
            {showCreateForm && (
                <CourseCreateForm
                    onClose={handleCloseForm}
                    onCreate={handleCreateCourse}
                />
            )}
        </>
    );
};

export default InstructorMyCourses;
