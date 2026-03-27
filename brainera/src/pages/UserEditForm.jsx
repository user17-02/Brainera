import React, { useState, useEffect } from 'react';
import formStyles from '../components/Form.module.css';

const UserEditForm = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'student', // Default role if not set
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(user._id, formData);
    };

    return (
        <div className={formStyles.modalOverlay}>
            <div className={ `${formStyles.modalContent} card p-4` }>
                <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Edit User</h3>
                <form onSubmit={handleSubmit} className={ `${formStyles.formLayout} g-3` }>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="userId" className="form-label">User ID</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={user._id || ''}
                            readOnly
                            className={ `${formStyles.readOnlyInput} form-control-plaintext` }
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="name" className="form-label">Name</label>
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
                        <label htmlFor="email" className="form-label">Email</label>
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
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditForm;
