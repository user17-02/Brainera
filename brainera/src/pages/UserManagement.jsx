import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css'; // Component-specific styles
import adminStyles from './AdminDashboard.module.css'; // Admin dashboard layout styles
import UserEditForm from './UserEditForm'; // Import the new UserEditForm
import UserCreateForm from './UserCreateForm'; // Import the new UserCreateForm

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null); // State to hold user being edited
    const [showEditForm, setShowEditForm] = useState(false); // State to control edit form visibility
    const [showCreateForm, setShowCreateForm] = useState(false); // State to control create form visibility

    const fetchUsers = async () => { // Moved fetchUsers outside useEffect for reusability
        try {
            const response = await fetch('/api/admin/users', {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = 'Failed to fetch users';
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
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Empty dependency array means this runs once on mount

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to delete user');
                }
                setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setShowEditForm(true);
    };

    const handleSaveEdit = async (userId, updatedData) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to update user');
            }
            // const updatedUser = await response.json(); // Backend now returns user without password
            fetchUsers(); // Refresh the list to show updated user
            setShowEditForm(false);
            setUserToEdit(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreateUser = async (newUserData) => {
        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(newUserData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to create user');
            }
            alert('User created successfully!');
            fetchUsers(); // Refresh the list
            setShowCreateForm(false); // Close the create form
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCloseForm = () => {
        setShowEditForm(false);
        setUserToEdit(null);
        setShowCreateForm(false); // Close create form as well
    };

    if (loading) {
        return <p className={adminStyles.loadingMessage}>Loading users...</p>; // Using adminStyles for consistency
    }

    if (error) {
        return <p className={adminStyles.errorMessage}>Error: {error}</p>; // Using adminStyles for consistency
    }

    return (
        <div className="container-fluid py-4"> {/* Use Bootstrap container for main content area padding */}
            {!showEditForm && !showCreateForm && ( /* Conditionally render the table and header */
                <div className="card"> {/* Bootstrap card for the entire management section */}
                    <div className="card-body"> {/* Card body for padding */}
                        <div className="d-flex justify-content-between align-items-center mb-3"> {/* Bootstrap for title and button alignment */}
                            <h2 className="mb-0">User Management</h2> {/* mb-0 to remove bottom margin */}
                            <button 
                                className="btn btn-primary" // Bootstrap primary button
                                onClick={() => setShowCreateForm(true)}
                            >
                                Add User
                            </button>
                        </div>
                        <div className="table-responsive"> {/* For responsive tables */}
                                                        <table className="table table-striped table-hover"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead><tbody>{users.map((user) => (<tr key={user._id}><td>{user._id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td><button className="btn btn-sm btn-info me-2" onClick={() => handleEditClick(user)}>Edit</button><button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button></td></tr>))}</tbody></table>                        </div>
                    </div>
                </div>
            )}
            {showEditForm && userToEdit && (
                <UserEditForm 
                    user={userToEdit} 
                    onClose={handleCloseForm} 
                    onSave={handleSaveEdit} 
                />
            )}
            {showCreateForm && (
                <UserCreateForm
                    onClose={handleCloseForm}
                    onCreate={handleCreateUser}
                />
            )}
        </div>
    );
};

export default UserManagement;
