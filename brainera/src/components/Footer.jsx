import React from 'react';
import { BookOpen, MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import logo from '../assets/Logo-2-1-1536x366.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand & Subscribe */}
                    <div>
                        <Link to="/">
                            <img src={logo} alt="Brainera" className={styles.brandLogo} />
                        </Link>
                        <p className={styles.description}>
                            We are an online learning platform dedicated to helping students and professionals upgrade their skills anytime, anywhere.
                        </p>

                        <div className={styles.subscribeForm}>
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className={styles.emailInput}
                            />
                            <button className={styles.subscribeBtn}>
                                <Send size={16} />
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Get In Touch */}
                    <div>
                        <h3 className={styles.columnTitle}>Get In Touch</h3>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <MapPin size={18} className={styles.contactIcon} />
                                <span>Callison Laney Buoy Building W 13th Parks Suite 559, Denver</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail size={18} className={styles.contactIcon} />
                                <span>support@example.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={18} className={styles.contactIcon} />
                                <span>+0 (555) 123 45 67</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={styles.columnTitle}>Quick Links</h3>
                        <ul className={styles.linkList}>
                            <li><Link to="/" className={styles.linkItem}>Home</Link></li>
                            <li><Link to="/about-us" className={styles.linkItem}>About Us</Link></li>
                            <li><Link to="/courses" className={styles.linkItem}>Courses</Link></li>
                            <li><Link to="/pricing" className={styles.linkItem}>Pricing</Link></li>
                            <li><Link to="/blog" className={styles.linkItem}>Blog</Link></li>
                            <li><Link to="/contact-us" className={styles.linkItem}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className={styles.columnTitle}>Follow Us</h3>
                        <div className={styles.socialList}>
                            <a href="#" className={styles.socialLink}>
                                <Facebook size={18} className={styles.socialIcon} />
                                Facebook
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Instagram size={18} className={styles.socialIcon} />
                                Instagram
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Twitter size={18} className={styles.socialIcon} />
                                Twitter
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Youtube size={18} className={styles.socialIcon} />
                                Youtube
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Outside container for full width bg if needed, but styling seems to limit it. Checking visual... */}
            <div className={styles.bottom}>
                <p className={styles.copyright}>&copy; Brainera by codeinsolutions. All Right Reserved 2025.</p>
            </div>
        </footer>
    );
};

export default Footer;
