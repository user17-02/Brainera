import React, { useState, useEffect } from 'react';
import { BookOpen, Users } from 'lucide-react';
import styles from './Courses.module.css';

const BACKEND_BASE_URL = 'https://learnsphere-zwzg.onrender.com';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/courses`);
                if (!response.ok) {
                    throw new Error('Failed to fetch courses from API');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchCourses();
    }, []);

    const displayedCourses = courses.slice(0, 3);

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
                        <div key={course._id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={course.thumbnail} alt={course.title} className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.category}>{course.category}</span>
                                <h3 className={styles.courseTitle}>{course.title}</h3>

                                <div className={styles.meta}>
                                    <div className={styles.metaItem}>
                                        <BookOpen size={18} />
                                        <span>{course.sections || 10} Sections</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <Users size={18} />
                                        <span>{course.students?.length || 0} Students</span>
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
