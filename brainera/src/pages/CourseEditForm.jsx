import React, { useState, useEffect } from 'react';
import formStyles from '../components/Form.module.css';

const CourseEditForm = ({ course, onClose, onSave, currentUser }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        instructor: '', // Will store ID for submission, display name for UI
        price: 0,
        imageFile: null,
        existingThumbnail: '',
        status: 'draft',
    });

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                category: course.category || '',
                instructor: course.instructor?.name || course.instructor || '', // Display name, keep ID if not populated
                price: course.price || 0,
                imageFile: null,
                existingThumbnail: course.thumbnail || '',
                status: course.status || 'draft',
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : (name === 'price' ? parseFloat(value) : value), // Handle file and price conversion
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(course._id, formData); // Pass formData directly, CourseManagement will handle FormData conversion
    };

    return (
        <div className={formStyles.modalOverlay}>
            <div className={ `${formStyles.modalContent} card p-4` }>
                <button className="btn-close" onClick={onClose} aria-label="Close"></button>
                <h3 className={ `${formStyles.modalTitle} h5 mb-3` }>Edit Course</h3> {/* Using modalTitle for consistency */}
                <form onSubmit={handleSubmit} className={ `${formStyles.formLayout} g-3` }>
                    <div className={ `${formStyles.formGroup} mb-3` }>
                        <label htmlFor="courseId" className="form-label">Course ID</label>
                        <input
                            type="text"
                            id="courseId"
                            name="courseId"
                            value={course._id || ''}
                            readOnly
                            className={ `${formStyles.readOnlyInput} form-control-plaintext` }
                        />
                    </div>
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
                        <label htmlFor="instructor" className="form-label">Instructor ID/Name</label>
                        <input
                            type="text"
                            id="instructor"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            className="form-control"
                            readOnly={currentUser?.role !== 'admin'} // Make readOnly if not admin
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
                            className="form-control"
                        />
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
                        {formData.existingThumbnail && !formData.imageFile && (
                            <div className="mt-2">
                                <small className="text-muted d-block mb-1">Current Thumbnail:</small>
                                <img src={formData.existingThumbnail} alt="Current Thumbnail" className="img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </div>
                        )}
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
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseEditForm;
