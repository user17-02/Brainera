import React from 'react';
import { Code2, Megaphone, PenTool, Share2 } from 'lucide-react';
import styles from './CourseCategories.module.css';

const CourseCategories = () => {
    const categories = [
        {
            title: "Web Development",
            description: "Build dynamic websites with HTML, CSS, JavaScript",
            icon: Code2
        },
        {
            title: "Digital Marketing",
            description: "Master SEO, ads, and content strategy tools",
            icon: Megaphone
        },
        {
            title: "Graphic Design",
            description: "Create visual magic using modern design software",
            icon: PenTool
        },
        {
            title: "Data Science",
            description: "Analyze and visualize data for smarter decisions",
            icon: Share2 // Visual approximation of the node graph in image
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>Category</span>
                    <h2 className={styles.title}>Explore Course Categories</h2>
                </div>

                <div className={styles.grid}>
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.cardTitle}>{cat.title}</h3>
                                <p className={styles.description}>{cat.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CourseCategories;
