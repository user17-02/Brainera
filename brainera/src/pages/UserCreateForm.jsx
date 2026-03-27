import React, { useState } from 'react';
import formStyles from '../components/Form.module.css';

const UserCreateForm = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onCreate(formData); // Call the onCreate prop with the new user data
    };

    return (
        <div className={formStyles.modalOverlay}>
            <div className={ `${formStyles.modalContent} card p-4` }>
                <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Create New User</h3>
                <form onSubmit={handleSubmit} className={ `${formStyles.formLayout} g-3` }>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className={ `${formStyles.modalActions} d-flex justify-content-end gap-2 mt-4` }>
                        <button type="submit" className="btn btn-primary">Create User</button>
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserCreateForm;