import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import styles from './CourseManagement.module.css';
import adminStyles from './AdminDashboard.module.css'; // Admin dashboard layout styles
import CourseEditForm from './CourseEditForm'; // Import the new CourseEditForm
import CourseCreateForm from './CourseCreateForm'; // Import the new CourseCreateForm
import AuthContext from '../context/AuthContext'; // Import AuthContext

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';
const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseToEdit, setCourseToEdit] = useState(null); // State to hold course being edited
    const [showEditForm, setShowEditForm] = useState(false); // State to control edit form visibility
    const [showCreateForm, setShowCreateForm] = useState(false); // State to control create form visibility
    const { user } = useContext(AuthContext); // Get user from AuthContext

    const fetchCourses = async () => { // Moved fetchCourses outside useEffect for reusability
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/admin/courses`, { // Assuming admin can get all courses
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = 'Failed to fetch courses';
                if (response.status === 401) {
                    errorMessage = 'Unauthorized: Please log in as an administrator.';
                } else if (response.status === 403) {
                    errorMessage = 'Forbidden: You do not have admin privileges.';
                } else {
                    errorMessage = errorData.msg || errorMessage;
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []); // Empty dependency array means this runs once on mount

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/courses/${courseId}`, {
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
                fetchCourses(); // Refresh the list
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
            const response = await fetch(`${BACKEND_BASE_URL}/api/admin/courses/${courseId}`, {
                method: 'PUT',
                headers: headers,
                body: bodyContent,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to update course');
            }
            alert('Course updated successfully!');
            fetchCourses();
            setShowEditForm(false);
            setCourseToEdit(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateCourse = async (newCourseData) => {
        console.log('handleCreateCourse called with newCourseData:', newCourseData);

        let bodyContent;
        const headers = {
            'x-auth-token': localStorage.getItem('token'),
        };

        if (newCourseData.imageFile) {
            console.log('Image file detected. Preparing FormData.');
            const formData = new FormData();
            for (const key in newCourseData) {
                if (key === 'existingThumbnail') continue;
                formData.append(key, newCourseData[key]);
            }
            bodyContent = formData;
        } else {
            console.log('No image file. Preparing JSON body.');
            headers['Content-Type'] = 'application/json';
            const { imageFile, existingThumbnail, ...rest } = newCourseData;
            bodyContent = JSON.stringify(rest);
        }

        console.log('Request headers:', headers);
        console.log('Request bodyContent (type):', typeof bodyContent);
        if (bodyContent instanceof FormData) {
            console.log('Request bodyContent is FormData. Contents not directly inspectable here.');
        } else {
            console.log('Request bodyContent:', bodyContent);
        }

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/courses`, {
                method: 'POST',
                headers: headers,
                body: bodyContent,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to create course');
            }
            alert('Course created successfully!');
            fetchCourses();
            setShowCreateForm(false);
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
        return <p className={adminStyles.loadingMessage}>Loading courses...</p>;
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>;
    }

    return (
        <div className="container-fluid py-4">
            {!showEditForm && !showCreateForm && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="mb-0">Course Management</h2>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setShowCreateForm(true)}
                            >
                                Add Course
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Instructor</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course._id}</td>
                                            <td>{course.title}</td>
                                            <td>{course.category}</td>
                                            <td>{course.instructor?.name || 'N/A'}</td>
                                            <td>{course.status}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info me-2" onClick={() => handleEditClick(course)}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {showEditForm && courseToEdit && (
                <CourseEditForm
                    course={courseToEdit}
                    onClose={handleCloseForm}
                    onSave={handleSaveEdit}
                    currentUser={user}
                />
            )}
            {showCreateForm && (
                <CourseCreateForm
                    onClose={handleCloseForm}
                    onCreate={handleCreateCourse}
                />
            )}
        </div>
    );
};

export default CourseManagement;
