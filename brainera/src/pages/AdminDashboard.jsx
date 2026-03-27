import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import styles from './AdminDashboard.module.css';
import { LayoutDashboard, Users, BookOpen, Layers, MessageSquare, Settings, LogOut, Code, Menu, X } from 'lucide-react'; // Import icons
import logoImage from '../assets/Logo-2-1-1536x366.png'; // Import the logo

const AdminDashboard = () => {
  const { isLoggedIn, user, logout, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  useEffect(() => {
    if (!authLoading && (!isLoggedIn || user?.role !== 'admin')) {
      navigate('/login-register');
    }
  }, [isLoggedIn, user, navigate, authLoading]);

  const handleLogout = () => {
    logout();
    navigate('/login-register');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (authLoading) {
    return <p>Loading authentication...</p>;
  }

  if (!isLoggedIn || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className={styles.adminDashboard}>
      {/* Mobile Header (Fixed Top) */}
      <div className={styles.mobileHeader}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={styles.mobileLogo}>
            <img src={logoImage} alt="Brainera Logo" className={styles.mobileLogoImage} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>
            <span className={styles.sidebarLogoText}>Brainera Admin</span>
          </div>
          <button className={styles.closeSidebarBtn} onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className={styles.sidebarNavList}>
            <li>
              <NavLink to="/admin" end className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                <LayoutDashboard size={20} />
                Dashboard Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                <Users size={20} />
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/courses" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                <BookOpen size={20} />
                Course Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/enrollments" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                <Layers size={20} />
                Enrollments
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reviews" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                <MessageSquare size={20} />
                Reviews
              </NavLink>
            </li>
            {isLoggedIn && (user?.role === 'instructor' || user?.role === 'admin') && (
                <li>
                    <NavLink to="/instructor" className={({ isActive }) => `${styles.sidebarNavLink} ${isActive ? styles.activeSidebarNavLink : ''}`} onClick={closeSidebar}>
                        <LayoutDashboard size={20} />
                        Instructor Panel
                    </NavLink>
                </li>
            )}
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

export default AdminDashboard;
