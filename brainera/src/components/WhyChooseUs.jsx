import React from 'react';
import { UserCheck, Clock, Award, Activity } from 'lucide-react';
import styles from './WhyChooseUs.module.css';
import studentImage from '../assets/woman-holding-with-laptop-computer-2025-03-26-00-51-28-utc-1-1.png';

const WhyChooseUs = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.content}>
                    <span className={styles.tagline}>Why Choose Us</span>
                    <h2 className={styles.title}>Discover The Smarter Way To Learn With Us</h2>
                    <p className={styles.description}>
                        Learn smarter, not harder. Our approach combines innovation, flexibility, and support to help you achieve more with less stress—wherever you are in your learning journey.
                    </p>

                    <div className={styles.featuresGrid}>
                        {/* Feature 1 */}
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <UserCheck size={24} />
                            </div>
                            <div className={styles.featureText}>
                                <h4>Expert Instructors</h4>
                                <p>Learn from industry leaders with years of real-world experience</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <Clock size={24} />
                            </div>
                            <div className={styles.featureText}>
                                <h4>Flexible Access</h4>
                                <p>Study anytime, anywhere with full device compatibility</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <Award size={24} />
                            </div>
                            <div className={styles.featureText}>
                                <h4>Certified Courses</h4>
                                <p>Gain recognized certificates to boost your career goals</p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className={styles.featureItem}>
                            <div className={styles.iconWrapper}>
                                <Activity size={24} />
                            </div>
                            <div className={styles.featureText}>
                                <h4>Interactive Learning</h4>
                                <p>Enjoy hands-on projects and real-time student engagement</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className={styles.imageWrapper}>
                    <div className={styles.tealBg}></div>
                    <img src={studentImage} alt="Student with laptop" className={styles.image} />

                    <div className={styles.floatingCard}>
                        <div className={styles.cardIconCircle}>
                            <Award size={20} />
                        </div>
                        <div className={styles.cardText}>
                            <span className={styles.cardTitle}>85 +</span>
                            <span className={styles.cardSubtitle}>Global Certifications</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
