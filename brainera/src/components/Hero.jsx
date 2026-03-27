import React from 'react';
import { User, Headset, Star } from 'lucide-react';
import styles from './Hero.module.css';
import heroImage from '../assets/asian-woman-student-standing-with-laptop-coffee-an-2025-01-08-04-43-37-2utc-1-1-1.png';
import avatar1 from '../assets/rating-1.jpg';
import avatar2 from '../assets/rating-2.jpg';
import avatar3 from '../assets/rating-3.jpg';
import avatar4 from '../assets/rating-4.jpg';

const Hero = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.content}>
                    <span className={styles.tagline}>Try It Now</span>
                    <h1 className={styles.title}>
                        Flexible Learning for <br /> Busy Minds
                    </h1>
                    <p className={styles.description}>
                        Learn anytime, anywhere. Designed for busy lives, our flexible courses let you grow on your schedule.
                    </p>

                    <div className={styles.socialProof}>
                        <div className={styles.avatars}>
                            <img src={avatar1} alt="User" />
                            <img src={avatar2} alt="User" />
                            <img src={avatar3} alt="User" />
                            <img src={avatar4} alt="User" />
                        </div>
                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                            </div>
                            <span>4.9/5 Rating</span>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.joinBtn}>Join Course</button>
                        <button className={styles.startBtn}>Get Started</button>
                    </div>
                </div>

                {/* Right Image */}
                <div className={styles.imageWrapper}>
                    <div className={styles.tealBackground}></div>
                    <img
                        src={heroImage}
                        alt="Student with laptop"
                        className={styles.heroImage}
                    />

                    {/* Floating Cards */}
                    <div className={`${styles.floatCard} ${styles.cardTopLeft}`}>
                        <div className={styles.iconCircle}>
                            <User size={20} />
                        </div>
                        <div>
                            <span className={styles.cardTitle}>85,000 +</span>
                            <span className={styles.cardText}>Active Learners</span>
                        </div>
                    </div>

                    <div className={`${styles.floatCard} ${styles.cardBottomRight}`}>
                        <div className={`${styles.iconCircle} ${styles.darkIcon}`}>
                            <Headset size={20} />
                        </div>
                        <div>
                            <span className={styles.cardTitle}>180 +</span>
                            <span className={styles.cardText}>Expert Instructors</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
