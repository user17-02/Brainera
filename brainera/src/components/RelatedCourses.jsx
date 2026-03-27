import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css'; // Reuse existing styles
import data from '../data.json';

const RelatedCourses = () => {
    // Filter for Marketing courses to match the reference image
    // Reference shows: Digital Marketing, Social Media Strategy, SEO & Content Writing
    const relatedCourses = data.courses.filter(c =>
        c.title === "Digital Marketing Essentials" ||
        c.title === "Social Media Strategy" ||
        c.title === "SEO & Content Writing"
    );

    return (
        <section className={styles.section} style={{ backgroundColor: '#f9fafb' }}> {/* Light gray bg to separate */}
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.tagline}>Related Courses</span>
                        <h2 className={styles.title}>Explore Courses Crafted for Growth</h2>
                    </div>
                    <Link to="/courses" className={styles.viewAllBtn} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        All Courses
                    </Link>
                </div>

                <div className={styles.grid}>
                    {relatedCourses.map(course => (
                        <div key={course.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={course.image} alt={course.title} className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.category}>{course.category}</span>
                                <h3 className={styles.courseTitle}>{course.title}</h3>

                                <div className={styles.meta}>
                                    <div className={styles.metaItem}>
                                        <BookOpen size={18} />
                                        <span>{course.sections} Sections</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <Users size={18} />
                                        <span>{course.students} Students</span>
                                    </div>
                                </div>

                                <div className={styles.footer}>
                                    <span className={styles.price}>${course.price}</span>
                                    <button className={styles.joinBtn}>Join Course</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedCourses;
