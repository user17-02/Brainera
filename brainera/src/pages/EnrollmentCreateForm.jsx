import React, { useState, useEffect } from 'react';
import formStyles from '../components/Form.module.css';

const EnrollmentCreateForm = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        courseId: '',
    });
    // Optional: States for fetching users and courses for dropdowns
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDependencies = async () => {
            setError(null);
            try {
                // Fetch Users
                const usersResponse = await fetch('/api/admin/users', { // Assuming admin can get all users
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                if (usersResponse.ok) {
                    const usersData = await usersResponse.json();
                    setUsers(usersData);
                } else {
                    throw new Error('Failed to fetch users');
                }
                setLoadingUsers(false);

                // Fetch Courses
                const coursesResponse = await fetch('/api/admin/courses', { // Assuming admin can get all courses
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                if (coursesResponse.ok) {
                    const coursesData = await coursesResponse.json();
                    setCourses(coursesData);
                } else {
                    throw new Error('Failed to fetch courses');
                }
                setLoadingCourses(false);

            } catch (err) {
                console.error('Error fetching dependencies:', err);
                setError(err.message);
                setLoadingUsers(false);
                setLoadingCourses(false);
            }
        };
        fetchDependencies();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onCreate(formData); // Call the onCreate prop with the new enrollment data
    };

    if (loadingUsers || loadingCourses) {
        return (
            <div className={formStyles.modalOverlay}>
                <div className={ `${formStyles.modalContent} card p-4` }>
                    <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Creating Enrollment</h3>
                    <p>Loading users and courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={formStyles.modalOverlay}>
                <div className={ `${formStyles.modalContent} card p-4` }>
                    <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                    <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Error</h3>
                    <p className="alert alert-danger">{error}</p>
                    <button type="button" onClick={onClose} className="btn btn-outline-secondary">Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className={formStyles.modalOverlay}>
            <div className={ `${formStyles.modalContent} card p-4` }>
                <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Create New Enrollment</h3>
                <form onSubmit={handleSubmit} className={ `${formStyles.formLayout} g-3` }>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="studentId" className="form-label">Student</label>
                        <select
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select Student</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                            ))}
                        </select>
                    </div>
                    <div className={formStyles.formGroup}>
                        <label htmlFor="courseId">Course</label>
                        <select
                            id="courseId"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={formStyles.modalActions}>
                        <button type="submit" className={formStyles.saveButton}>Create Enrollment</button>
                        <button type="button" onClick={onClose} className={formStyles.cancelButton}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnrollmentCreateForm;
