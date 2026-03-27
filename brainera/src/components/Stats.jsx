import React from 'react';
import { BookOpen, Headset, Clock } from 'lucide-react';
import styles from './Stats.module.css';

const Stats = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    {/* Item 1 */}
                    <div className={styles.item}>
                        <div className={styles.iconWrapper}>
                            <BookOpen size={28} />
                        </div>
                        <div className={styles.content}>
                            <h3>80k+ Online Course</h3>
                            <p>Learn the skills that matter mostwith over 155.000 video course</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className={styles.item}>
                        <div className={styles.iconWrapper}>
                            <Headset size={28} />
                        </div>
                        <div className={styles.content}>
                            <h3>Experts Mentor</h3>
                            <p>Choose courses tought by real-world experts who will broaden</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className={styles.item}>
                        <div className={styles.iconWrapper}>
                            <Clock size={28} />
                        </div>
                        <div className={styles.content}>
                            <h3>Lifetime Access</h3>
                            <p>Learn at your own pace, with lifetime access on mobile and desktop</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
