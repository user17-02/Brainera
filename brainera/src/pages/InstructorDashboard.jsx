import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from './InstructorDashboard.module.css';
import { LayoutDashboard, BookOpen, Users, LogOut, Code, Menu, X } from 'lucide-react'; // Import necessary icons

const InstructorDashboard = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

    useEffect(() => {
        if (!isLoggedIn || user?.role !== 'instructor') {
            navigate('/login-register');
        }
    }, [isLoggedIn, user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login-register');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    if (!isLoggedIn || user?.role !== 'instructor') {
        return null;
    }

    return (
        <div className={styles.instructorDashboard}>
            {/* Mobile Header (Fixed Top) */}
            <div className={styles.mobileHeader}>
                <button className={styles.hamburger} onClick={toggleSidebar}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className={styles.mobileTitle}>Instructor Panel</div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.sidebarBrand}>
                        <span className={styles.sidebarLogoText}>Instructor Panel</span>
                    </div>
                    <button className={styles.closeSidebarBtn} onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>
                <nav>
                    <ul className={styles.sidebarNavList}>
                        <li>
                            <NavLink to="/instructor" end className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                                <LayoutDashboard size={20} />
                                Dashboard Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/instructor/my-courses" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                                <BookOpen size={20} />
                                My Courses
                            </NavLink>
                        </li>

                        <li className={styles.sidebarLogout}>
                            <button onClick={handleLogout} className={styles.sidebarNavLink}>
                                <LogOut size={20} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className={styles.mainContentWrapper}>
                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default InstructorDashboard;

