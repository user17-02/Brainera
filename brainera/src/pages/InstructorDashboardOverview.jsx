import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from './InstructorDashboard.module.css';
import { LayoutDashboard, BookOpen, LogOut, Menu, X } from 'lucide-react';

const InstructorDashboard = () => {
    const { isLoggedIn, user, logout, authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!isLoggedIn || user?.role !== 'instructor') {
                navigate('/login-register');
            }
        }
    }, [isLoggedIn, user, authLoading, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login-register');
    };

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    // 🔥 Prevent flicker before auth loads
    if (authLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!isLoggedIn || user?.role !== 'instructor') {
        return null;
    }

    return (
        <div className={styles.instructorDashboard}>
            
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <button className={styles.hamburger} onClick={toggleSidebar}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className={styles.mobileTitle}>Instructor Panel</div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={closeSidebar}></div>
            )}

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
                            <NavLink
                                to="/instructor"
                                end
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`
                                }
                            >
                                <LayoutDashboard size={20} />
                                Dashboard Overview
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/instructor/my-courses"
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`
                                }
                            >
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

            {/* Main Content */}
            <div className={styles.mainContentWrapper}>
                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default InstructorDashboard;
