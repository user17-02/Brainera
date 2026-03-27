import React from 'react';
import { Apple, Play } from 'lucide-react';
import styles from './AppDownload.module.css';
import modelImage from '../assets/cool-young-black-guy-against-isolated-white-backgr-2024-10-18-06-58-46-utc-1-1.png';

const AppDownload = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>
                            Download the Brainera app now and learn anywhere, anytime.
                        </h2>

                        <div className={styles.storeButtons}>
                            {/* App Store */}
                            <button className={styles.storeBtn}>
                                <Apple size={28} fill="white" />
                                <div className={styles.btnText}>
                                    <small>Download on the</small>
                                    <span>App Store</span>
                                </div>
                            </button>

                            {/* Google Play */}
                            <button className={styles.storeBtn}>
                                <Play size={24} fill="white" /> {/* Approximating Play Store triangle */}
                                <div className={styles.btnText}>
                                    <small>GET IT ON</small>
                                    <span>Google Play</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className={styles.imageWrapper}>
                        <img
                            src={modelImage}
                            alt="Student using app"
                            className={styles.modelImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
