import React from 'react';
import PageHeader from '../components/PageHeader';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import CTA from '../components/CTA';
import styles from './ContactUs.module.css';

const ContactUs = () => {
    return (
        <div className={styles.pageWrapper}>
            <PageHeader title="Contact Us" breadcrumb="Contact Us" />

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    {/* Section Header */}
                    <div className={styles.sectionHeader}>
                        <div className={styles.headerTitle}>
                            <span className={styles.tagline}>Contact Us</span>
                            <h2 className={styles.title}>We’re Here to Help — Let’s Start the Conversation</h2>
                        </div>
                        <div className={styles.headerDescription}>
                            <p>Have questions or need help? Our team is here to assist you—just send us a message anytime.</p>
                        </div>
                    </div>

                    {/* Form & Map Grid */}
                    <div className={styles.formMapGrid}>
                        {/* Form Column */}
                        <div className={styles.formCard}>
                            <h3 className={styles.cardTitle}>Send Us Message</h3>
                            <form className={styles.contactForm}>
                                <div className={styles.formInputsGrid}>
                                    <input type="text" placeholder="Your Name" required />
                                    <input type="email" placeholder="Your Email" required />
                                    <input type="text" placeholder="Subject" required />
                                    <input type="text" placeholder="Your Phone" required />
                                </div>
                                <textarea placeholder="Your Message" rows="6" required></textarea>
                                <button type="submit" className={styles.submitBtn}>
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Map Column */}
                        <div className={styles.mapCard}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.736021575086!2d-105.08119042402283!3d39.72912497155823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b8344e738af01%3A0x6b0d8b4e0d83b4e!2sW%2013th%20Ave%2C%20Lakewood%2C%20CO%2C%20USA!5e0!3m2!1sen!2sin!4v1709825000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards Section */}
            <section className={styles.infoSection}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <MapPin size={24} />
                            </div>
                            <div className={styles.infoText}>
                                <h3>Our Address</h3>
                                <p>W 13th Parks Suite 559, Denver</p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <Mail size={24} />
                            </div>
                            <div className={styles.infoText}>
                                <h3>Our Email</h3>
                                <p>support@example.com</p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <Phone size={24} />
                            </div>
                            <div className={styles.infoText}>
                                <h3>Our Phone</h3>
                                <p>+0 (123) 456 789</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
};

export default ContactUs;
