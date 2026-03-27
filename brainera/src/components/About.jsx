import React from 'react';
import { BookOpen, Clock, Award, Users } from 'lucide-react';
import styles from './About.module.css';
// Using the same student image as Hero temporarily, or preferably a different one if available.
// Since the specific "man holding coffee" isn't in assets, I'll use the "asian-woman-student" 
// but perhaps cropped or styled differently, OR simply the woman student as the reliable asset.
import aboutImage from '../assets/smiling-asian-student-guy-with-backpack-and-coffee-2024-10-18-09-31-05-utc-1-2.png';

const About = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side - Image with Shape */}
                <div className={styles.imageWrapper}>
                    <div className={styles.tealBg}></div>
                    <img
                        src={aboutImage}
                        alt="Student"
                        className={styles.mainImage}
                    />

                    <div className={styles.satisfactionCard}>
                        <div className={styles.iconCircle}>
                            <Users size={24} />
                        </div>
                        <div className={styles.cardText}>
                            <h4>95 %</h4>
                            <span>Student Satisfaction</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className={styles.content}>
                    <span className={styles.tagline}>About Us</span>
                    <h2 className={styles.title}>Empowering Young Minds <br /> For The Future</h2>
                    <p className={styles.mainDesc}>
                        Inspiring growth, building confidence. We equip young learners with the skills they need to thrive tomorrow.
                    </p>

                    <div className={styles.featuresList}>
                        {/* Feature 1 */}
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <BookOpen size={20} />
                            </div>
                            <div className={styles.featureContent}>
                                <h4>Quality Content</h4>
                                <p>Well-structured lessons crafted by industry experts.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <Clock size={20} />
                            </div>
                            <div className={styles.featureContent}>
                                <h4>Flexible Learning</h4>
                                <p>Access courses anytime that suits your schedule.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <Award size={20} />
                            </div>
                            <div className={styles.featureContent}>
                                <h4>Certified Programs</h4>
                                <p>Gain credentials that boost your professional credibility.</p>
                            </div>
                        </div>
                    </div>

                    <button className={styles.ctaBtn}>Get Started</button>
                </div>
            </div>
        </section>
    );
};

export default About;
