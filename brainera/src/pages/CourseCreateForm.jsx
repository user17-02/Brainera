import React, { useState } from 'react';
import formStyles from '../components/Form.module.css';

const CourseCreateForm = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: 0,
        duration: '',
        level: 'Beginner', // Default level
        imageFile: null, // To hold the selected image file
        status: 'published', // Default status changed to published
        // instructor: '', // Instructor will be automatically set to the logged-in admin/instructor
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : (name === 'price' ? parseFloat(value) : value), // Handle file and price conversion
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onCreate(formData); // Pass formData directly, CourseManagement will handle FormData conversion
    };

    return (
        <div className={formStyles.modalOverlay}>
            <div className={ `${formStyles.modalContent} card p-4` }>
                <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Create New Course</h3>
                <form onSubmit={handleSubmit} className={ `${formStyles.formLayout} g-3` }>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="category" className="form-label">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="duration" className="form-label">Duration (e.g., 10 hours)</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="level" className="form-label">Level</label>
                        <select
                            id="level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="imageFile" className="form-label">Thumbnail Image</label>
                        <input
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            onChange={handleChange}
                            className="form-control"
                            accept="image/*" // Accept only image files
                        />
                    </div>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <div className={ `${formStyles.modalActions} d-flex justify-content-end gap-2 mt-4` }>
                        <button type="submit" className="btn btn-primary">Create Course</button>
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseCreateForm;
