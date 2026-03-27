import React, { useState, useContext } from 'react'; // Import useContext
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Header.module.css';
import logoImage from '../assets/Logo-2-1-1536x366.png'; // Import the specific logo image
import AuthContext from '../context/AuthContext.jsx'; // Import AuthContext

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext); // Consume AuthContext
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    <img src={logoImage} alt="Brainera Logo" className={styles.logoImage} />
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li>
                            <Link to="/" className={`${styles.navLink} ${styles.active}`} style={{ color: 'var(--primary-color)' }}>
                                Home
                            </Link>
                        </li>
                        <li><Link to="/about-us" className={styles.navLink}>About Us</Link></li>
                        <li className={styles.dropdownParent}>
                            <Link to="/courses" className={styles.navLink}>
                                Courses <ChevronDown size={14} />
                            </Link>
                            <div className={styles.dropdownMenu}>
                                <Link to="/courses" className={styles.dropdownItem}>All Courses</Link>
                            </div>
                        </li>
                        <li className={styles.dropdownParent}>
                            <a href="#" className={styles.navLink}>
                                Page <ChevronDown size={14} />
                            </a>
                            <div className={styles.dropdownMenu}>
                                <Link to="/team" className={styles.dropdownItem}>Our Team</Link>
                                <Link to="/pricing" className={styles.dropdownItem}>Pricing</Link>
                                <Link to="/testimonials" className={styles.dropdownItem}>Testimonials</Link>
                                <Link to="/faq" className={styles.dropdownItem}>FAQ</Link>
                                <Link to="/blog" className={styles.dropdownItem}>Blog</Link>
                            </div>
                        </li>
                        <li>
                            <Link to="/blog" className={styles.navLink}>
                                Blog
                            </Link>
                        </li>
                        <li><Link to="/contact-us" className={styles.navLink}>Contact Us</Link></li>
                        {isLoggedIn && (
                            <li><Link to="/my-learning" className={styles.navLink}>My Learning</Link></li>
                        )}
                        {isLoggedIn && user?.role === 'admin' && (
                            <li><Link to="/admin" className={styles.navLink}>Admin Dashboard</Link></li>
                        )}
                        {isLoggedIn && user?.role === 'instructor' && (
                            <li><Link to="/instructor" className={styles.navLink}>Instructor Dashboard</Link></li>
                        )}
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className={styles.actions}>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className={styles.freeTrialBtn}>Logout</button>
                    ) : (
                        <Link to="/login-register" className={styles.freeTrialBtn}>Free Trial</Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--header-height)',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '20px',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    borderTop: '1px solid #eee',
                    zIndex: 999
                }}>
                    <Link to="/" className={styles.navLink} onClick={toggleMenu} style={{ color: 'var(--primary-color)' }}>Home</Link>
                    <Link to="/about-us" className={styles.navLink} onClick={toggleMenu}>About Us</Link>
                    <Link to="/courses" className={styles.navLink} onClick={toggleMenu}>Courses</Link>
                    <Link to="/blog" className={styles.navLink} onClick={toggleMenu}>Blog</Link>
                    <Link to="/contact-us" className={styles.navLink} onClick={toggleMenu}>Contact Us</Link>
                    {isLoggedIn && (
                         <Link to="/my-learning" className={styles.navLink}>My Learning</Link>
                    )}
                    {isLoggedIn && user?.role === 'admin' && (
                         <Link to="/admin" className={styles.navLink}>Admin Dashboard</Link>
                    )}
                    {isLoggedIn && user?.role === 'instructor' && (
                         <Link to="/instructor" className={styles.navLink}>Instructor Dashboard</Link>
                    )}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className={styles.freeTrialBtn} style={{ width: '100%' }}>Logout</button>
                    ) : (
                        <Link to="/login-register" className={styles.freeTrialBtn} style={{ width: '100%' }}>Free Trial</Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;

