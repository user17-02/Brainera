import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import styles from './Instructors.module.css';
import data from '../data.json';

// Import images directly
import img1 from '../assets/testimonials-picture-1.jpg';
import img2 from '../assets/testimonials-picture-2.jpg';
import img3 from '../assets/testimonials-picture-3.jpg';
import img4 from '../assets/testimonials-picture-4-1.jpg';

const Instructors = () => {
    const images = [img1, img2, img3, img4];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>Our Teachers</span>
                    <h2 className={styles.title}>Meet Our Inspiring Instructors</h2>
                </div>

                <div className={styles.grid}>
                    {data.instructors.map((instructor, index) => (
                        <div key={instructor.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={images[index]}
                                    alt={instructor.name}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{instructor.name}</h3>
                                <span className={styles.role}>{instructor.role}</span>

                                <div className={styles.socials}>
                                    <Facebook size={18} className={styles.socialIcon} fill="currentColor" strokeWidth={0} />
                                    <Twitter size={18} className={styles.socialIcon} fill="currentColor" strokeWidth={0} />
                                    <Instagram size={18} className={styles.socialIcon} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Instructors;
