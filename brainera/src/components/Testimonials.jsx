import React from 'react';
import styles from './Testimonials.module.css';
import data from '../data.json';

// Import images directly from assets
import img1 from '../assets/rating-1.jpg';
import img2 from '../assets/rating-2.jpg';
import img3 from '../assets/rating-3.jpg';

const Testimonials = () => {
    // Map local images to the data IDs or indices
    const images = [img1, img2, img3];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>Testimonials</span>
                    <h2 className={styles.title}>What Our Learners Say</h2>
                    <p className={styles.description}>
                        Discover how Brainera has transformed learning experiences for students across the globe. Real voices, real impact—see what they have to say.
                    </p>
                </div>

                <div className={styles.grid}>
                    {data.testimonials.map((item, index) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.profile}>
                                <img
                                    src={images[index]}
                                    alt={item.name}
                                    className={styles.avatar}
                                />
                                <div className={styles.meta}>
                                    <h4 className={styles.name}>{item.name}</h4>
                                    <span className={styles.role}>{item.role}</span>
                                </div>
                            </div>
                            <p className={styles.quote}>"{item.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
