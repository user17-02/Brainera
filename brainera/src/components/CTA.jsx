import React from 'react';
import styles from './CTA.module.css';

const CTA = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <span className={styles.tagline}>Try It Now</span>
                        <h2 className={styles.title}>Unlock Your Potential with Brainera</h2>
                        <p className={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.btnPrimary}>Get Started</button>
                        <button className={styles.btnOutline}>Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
