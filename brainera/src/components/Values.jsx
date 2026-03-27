import React from 'react';
import { BookOpen, Users, Award, Clock, Heart, Monitor, Globe, Shield } from 'lucide-react';
import styles from './Values.module.css';

const Values = () => {
    const values = [
        { icon: BookOpen, title: "Qualty Content", desc: "Our lessons are crafted by experts for maximum clarity and impact." },
        { icon: Clock, title: "Flexible Learning", desc: "Access courses anytime that suits your schedule." },
        { icon: Award, title: "Certified Programs", desc: "Gain credentials that boost your professional credibility." },
        { icon: Users, title: "Trusted by 5,000+", desc: "Join a community of learners worldwide." }, // Simplified text based on context
        { icon: BookOpen, title: "Lifelong Learning", desc: "We promote continuous growth through accessible and engaging education." },
        { icon: Heart, title: "Student First", desc: "Every decision is made with the learner’s success and comfort in mind." },
        { icon: Monitor, title: "Tech-Driven", desc: "Innovation powers our platform, making learning smarter and easier." },
        { icon: Globe, title: "Inclusive Access", desc: "We ensure education is open to all, regardless of background or location." },
        { icon: Shield, title: "Support Always", desc: "Our team is here to guide and assist you at every step of the journey." },
        { icon: Users, title: "Grow Together", desc: "We believe in community and shared success through collaborative learning." }
    ];
    // Filtering down to 8 items or specific ones mentioned in the extracted text?
    // The extracted text listed: "Lifelong Learning", "Student First", "Future Ready", "Quality Content", "Tech-Driven", "Inclusive Access", "Support Always", "Grow Together".
    // That's 8 items.

    const specificValues = [
        { icon: BookOpen, title: "Lifelong Learning", desc: "We promote continuous growth through accessible and engaging education." },
        { icon: Heart, title: "Student First", desc: "Every decision is made with the learner’s success and comfort in mind." },
        { icon: Monitor, title: "Future Ready", desc: "We equip learners with skills that matter in tomorrow’s digital world." }, // Mapped to Monitor
        { icon: Award, title: "Quality Content", desc: "Our lessons are crafted by experts for maximum clarity and impact." },
        { icon: Monitor, title: "Tech-Driven", desc: "Innovation powers our platform, making learning smarter and easier." },
        { icon: Globe, title: "Inclusive Access", desc: "We ensure education is open to all, regardless of background or location." },
        { icon: Shield, title: "Support Always", desc: "Our team is here to guide and assist you at every step of the journey." },
        { icon: Users, title: "Grow Together", desc: "We believe in community and shared success through collaborative learning." }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>Our Values</span>
                    <h2 className={styles.title}>Why Learners Trust Us</h2>
                </div>
                <div className={styles.grid}>
                    {specificValues.map((val, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <val.icon size={28} className={styles.icon} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.cardTitle}>{val.title}</h3>
                            <p className={styles.cardDesc}>{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
