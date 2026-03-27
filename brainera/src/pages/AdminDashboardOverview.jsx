import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader'; // Assuming PageHeader is self-contained Bootstrap-friendly
// import adminStyles from './AdminDashboard.module.css'; // Will no longer be directly used for styling most elements

const AdminDashboardOverview = () => {
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetch('/api/admin/stats', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to fetch dashboard stats');
                }
                const data = await response.json();
                setDashboardStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return <p className="text-center py-4">Loading Dashboard Overview...</p>;
    }

    if (error) {
        return <p className="alert alert-danger text-center">{error}</p>;
    }

    if (dashboardStats &&
        dashboardStats.usersCount === 0 &&
        dashboardStats.coursesCount === 0 &&
        dashboardStats.enrollmentsCount === 0 &&
        (!dashboardStats.recentUsers || dashboardStats.recentUsers.length === 0) &&
        (!dashboardStats.recentCourses || dashboardStats.recentCourses.length === 0)) {
        return (
            <div className="container-fluid py-4"> {/* Use Bootstrap container for main content area padding */}
                <PageHeader title="Dashboard Overview" breadcrumb="Home / Admin / Overview" />
                <p className="text-center mt-4">No dashboard data available. Please add some users, courses, and enrollments to see statistics.</p>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4"> {/* Use Bootstrap container for main content area padding */}
            <PageHeader title="Dashboard Overview" breadcrumb="Home / Admin / Overview" />

            {/* Stats Cards */}
            <div className="row g-4 mb-4"> {/* Bootstrap row with gap and bottom margin */}
                <div className="col-lg-4 col-md-6"> {/* Responsive columns */}
                    <div className="card text-center h-100 shadow-sm"> {/* Card styling */}
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase mb-3">Total Users</h5>
                            <p className="card-text h1 fw-bold text-primary">{dashboardStats.usersCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase mb-3">Total Courses</h5>
                            <p className="card-text h1 fw-bold text-success">{dashboardStats.coursesCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase mb-3">Total Enrollments</h5>
                            <p className="card-text h1 fw-bold text-info">{dashboardStats.enrollmentsCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Sections */}
            <div className="row g-4"> {/* Bootstrap row with gap */}
                <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title mb-0">Recent Users</h5>
                        </div>
                        <div className="card-body">
                            {dashboardStats.recentUsers && dashboardStats.recentUsers.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {dashboardStats.recentUsers.map(user => (
                                        <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {user.name} <span className="text-muted">{user.email}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-center">No recent users.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="card-title mb-0">Recent Courses</h5>
                        </div>
                        <div className="card-body">
                            {dashboardStats.recentCourses && dashboardStats.recentCourses.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {dashboardStats.recentCourses.map(course => (
                                        <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {course.title} <span className="text-muted">{course.category}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-center">No recent courses.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOverview;
