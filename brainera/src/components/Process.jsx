import React from 'react';
import { Play } from 'lucide-react';
import styles from './Process.module.css';

const Process = () => {
    const steps = [
        {
            number: "01.",
            title: "Browse Our Course Catalog"
        },
        {
            number: "02.",
            title: "Quickly Enroll In Your Class"
        },
        {
            number: "03.",
            title: "Join Live Or Recorded Session"
        },
        {
            number: "04.",
            title: "Complete And Earn Certificate"
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.content}>
                    <span className={styles.tagline}>Our Process</span>
                    <h2 className={styles.title}>How Learning Happens Step By Step</h2>
                    <p className={styles.description}>
                        At Brainera, we simplify education through a seamless and supportive process. From exploring courses to earning certifications, every step is crafted to guide learners efficiently toward success.
                    </p>

                    <button className={styles.videoBtn}>
                        <div className={styles.playIcon}>
                            <Play size={20} fill="currentColor" />
                        </div>
                        <span className={styles.btnText}>Watch Video</span>
                    </button>
                </div>

                {/* Right Grid */}
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.card}>
                            <span className={styles.stepNumber}>{step.number}</span>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
