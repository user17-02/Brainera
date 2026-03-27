import React from 'react';
import * as Icons from 'lucide-react';
import styles from './Categories.module.css';
import data from '../data.json';

const Categories = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>Categories</span>
                    <h2 className={styles.title}>Explore Course Categories</h2>
                </div>

                <div className={styles.grid}>
                    {data.categories.map((cat) => {
                        const IconComponent = Icons[cat.icon] || Icons.HelpCircle;

                        return (
                            <div key={cat.id} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <IconComponent size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                                <span className={styles.count}>{cat.count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
