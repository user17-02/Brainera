import React from 'react';
import { Check, X } from 'lucide-react';
import styles from './Pricing.module.css';

const Pricing = () => {
    const plans = [
        {
            name: "Basic",
            price: "29",
            description: "Ideal for individuals getting started.",
            isPopular: false,
            features: [
                { name: "Access to Core Courses", included: true },
                { name: "Mobile App Access", included: true },
                { name: "Community Forums", included: true },
                { name: "Certificate of Completion", included: true },
                { name: "Live Sessions Access", included: false },
                { name: "Offline Download", included: false },
                { name: "1-on-1 Mentorship", included: false },
            ]
        },
        {
            name: "Professional",
            price: "59",
            description: "Perfect for growing professionals.",
            isPopular: true,
            features: [
                { name: "Access to Core Courses", included: true },
                { name: "Mobile App Access", included: true },
                { name: "Community Forums", included: true },
                { name: "Certificate of Completion", included: true },
                { name: "Live Sessions Access", included: true },
                { name: "Offline Download", included: false },
                { name: "1-on-1 Mentorship", included: false },
            ]
        },
        {
            name: "Premium",
            price: "99",
            description: "Best for full-featured experience.",
            isPopular: false,
            features: [
                { name: "Access to Core Courses", included: true },
                { name: "Mobile App Access", included: true },
                { name: "Community Forums", included: true },
                { name: "Certificate of Completion", included: true },
                { name: "Live Sessions Access", included: true },
                { name: "Offline Download", included: true },
                { name: "1-on-1 Mentorship", included: true },
            ]
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${plan.isPopular ? styles.professional : ''}`}
                        >
                            {plan.isPopular && <div className={styles.popularBadge}>Popular</div>}

                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.priceWrapper}>
                                <span className={styles.currency}>$</span>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.duration}>/Month</span>
                            </div>
                            <p className={styles.description}>{plan.description}</p>

                            <h4 className={styles.featuresTitle}>Including:</h4>
                            <ul className={styles.featureList}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className={styles.featureItem}>
                                        {feature.included ? (
                                            <Check size={18} className={styles.checkIcon} strokeWidth={3} />
                                        ) : (
                                            <X size={18} className={styles.crossIcon} strokeWidth={2} />
                                        )}
                                        {feature.name}
                                    </li>
                                ))}
                            </ul>

                            <button className={`${styles.button} ${plan.isPopular ? styles.btnSecondary : styles.btnPrimary}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
