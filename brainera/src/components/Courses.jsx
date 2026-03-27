import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import styles from './Courses.module.css';
import data from '../data.json';

const Courses = () => {
    // Only show first 3 courses to match the image grid
    const displayedCourses = data.courses.slice(0, 3);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.tagline}>Our Courses</span>
                        <h2 className={styles.title}>Explore Courses Crafted for Growth</h2>
                    </div>
                    <button className={styles.viewAllBtn}>All Courses</button>
                </div>

                <div className={styles.grid}>
                    {displayedCourses.map(course => (
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

export default Courses;
