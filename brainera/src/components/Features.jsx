import React from 'react';
import * as Icons from 'lucide-react';
import styles from './Features.module.css';
import data from '../data.json';

const Features = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {data.features.map((feature, index) => {
                        const IconComponent = Icons[feature.icon] || Icons.CheckCircle;
                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <IconComponent size={32} />
                                </div>
                                <div>
                                    <h3 className={styles.title}>{feature.title}</h3>
                                    <p className={styles.description}>{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
