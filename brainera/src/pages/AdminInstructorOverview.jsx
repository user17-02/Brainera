import React, { useState, useEffect, useContext } from 'react';
import PageHeader from '../components/PageHeader';
import { ChevronDown, ChevronUp, BookOpen, Users as UsersIcon } from 'lucide-react'; // Renamed Users to UsersIcon to avoid conflict
import styles from './AdminInstructorOverview.module.css';
import adminStyles from './AdminDashboard.module.css'; // For common styling like table
import AuthContext from '../context/AuthContext';

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com'; // Ensure this matches your backend URL

const AdminInstructorOverview = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedInstructor, setExpandedInstructor] = useState(null); // To expand/collapse instructor's courses
    const [expandedCourse, setExpandedCourse] = useState(null); // To expand/collapse course's students

    const navigate = useNavigate(); // Import and use useNavigate

    useEffect(() => {
        if (!isLoggedIn || user?.role !== 'admin') {
            navigate('/login-register'); // Redirect non-admins
            return;
        }

        const fetchInstructors = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/instructors`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to fetch instructors.');
                }

                const data = await response.json();
                setInstructors(data.map(inst => ({ ...inst, courses: [], coursesLoaded: false }))); // Initialize with empty courses
            } catch (err) {
                console.error('Error fetching instructors:', err);
                setError(err.message);
                if (err.message.includes('Unauthorized')) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, [isLoggedIn, user, navigate, logout]);

    const fetchInstructorCourses = async (instructorId) => {
        const currentInstructors = [...instructors];
        const instructorIndex = currentInstructors.findIndex(inst => inst._id === instructorId);

        if (instructorIndex === -1 || currentInstructors[instructorIndex].coursesLoaded) return;

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/admin/instructors/${instructorId}/courses`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to fetch courses for instructor.');
            }

            const data = await response.json();
            currentInstructors[instructorIndex].courses = data.map(course => ({ ...course, students: [], studentsLoaded: false }));
            currentInstructors[instructorIndex].coursesLoaded = true;
            setInstructors(currentInstructors);
        } catch (err) {
            console.error('Error fetching instructor courses:', err);
            setError(err.message);
        }
    };

    const fetchCourseStudents = async (courseId) => {
        const currentInstructors = [...instructors];
        // Find the course within the nested structure
        let courseFound = false;
        for (const instructor of currentInstructors) {
            const courseIndex = instructor.courses.findIndex(course => course._id === courseId);
            if (courseIndex !== -1 && !instructor.courses[courseIndex].studentsLoaded) {
                try {
                    const response = await fetch(`${BACKEND_BASE_URL}/api/admin/courses/${courseId}/enrollments`, {
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.msg || 'Failed to fetch students for course.');
                    }

                    const data = await response.json();
                    instructor.courses[courseIndex].students = data.enrollments.map(enroll => enroll.studentId); // Extract student data
                    instructor.courses[courseIndex].studentsLoaded = true;
                    setInstructors(currentInstructors); // Update state to re-render
                    courseFound = true;
                    break;
                } catch (err) {
                    console.error('Error fetching course students:', err);
                    setError(err.message);
                }
            }
        }
        if (!courseFound) {
            // Handle case where course is not found or already loaded
        }
    };

    const toggleInstructorCourses = (instructorId) => {
        if (expandedInstructor === instructorId) {
            setExpandedInstructor(null);
        } else {
            setExpandedInstructor(instructorId);
            fetchInstructorCourses(instructorId); // Fetch courses when expanding
        }
    };

    const toggleCourseStudents = (courseId) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
        } else {
            setExpandedCourse(courseId);
            fetchCourseStudents(courseId); // Fetch students when expanding
        }
    };


    if (loading) {
        return <p className={adminStyles.loadingMessage}>Loading instructor overview...</p>;
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>;
    }

    if (!isLoggedIn || user?.role !== 'admin') {
        return <p className={adminStyles.errorMessage}>Access denied. Admins only.</p>;
    }

    return (
        <>
            <PageHeader title="Instructor Overview" breadcrumb="Instructor Overview" />

            <section className={styles.overviewSection}>
                <div className={adminStyles.container}> {/* Reusing admin container styling */}
                    <h2 className={styles.sectionTitle}>Manage Instructors & Their Content</h2>

                    {instructors.length === 0 ? (
                        <p className={styles.noDataMessage}>No instructors found.</p>
                    ) : (
                        <div className={styles.instructorsList}>
                            {instructors.map(instructor => (
                                <div key={instructor._id} className={styles.instructorCard}>
                                    <button
                                        className={styles.instructorHeader}
                                        onClick={() => toggleInstructorCourses(instructor._id)}
                                    >
                                        <h3><UsersIcon size={20} className={styles.icon} /> {instructor.name} ({instructor.email})</h3>
                                        {expandedInstructor === instructor._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>

                                    {expandedInstructor === instructor._id && (
                                        <div className={styles.instructorCourses}>
                                            {instructor.courses.length === 0 ? (
                                                <p className={styles.noDataSubMessage}>No courses found for this instructor.</p>
                                            ) : (
                                                <div className={styles.coursesList}>
                                                    {instructor.courses.map(course => (
                                                        <div key={course._id} className={styles.courseItem}>
                                                            <button
                                                                className={styles.courseHeader}
                                                                onClick={() => toggleCourseStudents(course._id)}
                                                            >
                                                                <h4><BookOpen size={18} className={styles.icon} /> {course.title} (Status: {course.status})</h4>
                                                                {expandedCourse === course._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                            </button>

                                                            {expandedCourse === course._id && (
                                                                <div className={styles.courseStudents}>
                                                                    {course.students.length === 0 ? (
                                                                        <p className={styles.noDataSubMessage}>No students enrolled in this course yet.</p>
                                                                    ) : (
                                                                        <div className={adminStyles.tableResponsive}>
                                                                            <table className={adminStyles.table}>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Student Name</th>
                                                                                        <th>Email</th>
                                                                                        <th>Payment Status</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {course.students.map(student => (
                                                                                        <tr key={student._id}>
                                                                                            <td>{student.name}</td>
                                                                                            <td>{student.email}</td>
                                                                                            <td>{student.paymentStatus || 'N/A'}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default AdminInstructorOverview;
