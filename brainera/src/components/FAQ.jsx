import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const FAQ = ({ data, tagline = "FAQ", title = "Need Help? Brainera Has the Answers", showContact = true }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const defaultFaqs = [
        {
            question: "How do I enroll in a course?",
            answer: "Simply browse our catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through a quick registration and payment process."
        },
        {
            question: "Are all courses beginner-friendly?",
            answer: "Most of our courses are designed for beginners, but we also offer intermediate and advanced levels. Check the course prerequisites in the description to be sure."
        },
        {
            question: "Do I get a certificate after completion?",
            answer: "Yes! Upon successfully completing a course and its assessments, you will receive a verified certificate that you can download and share on your LinkedIn profile."
        },
        {
            question: "Can I access classes on mobile?",
            answer: "Absolutely. Our platform is fully responsive, and we also have a dedicated mobile app for iOS and Android so you can learn anytime, anywhere."
        },
        {
            question: "What payment methods are supported?",
            answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and various local payment methods depending on your region."
        },
        {
            question: "Is there any refund policy available?",
            answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course content, you can request a full refund within the first 30 days."
        }
    ];

    const faqs = data || defaultFaqs;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Column */}
                <div className={styles.infoColumn}>
                    <span className={styles.tagline}>{tagline}</span>
                    <h2 className={styles.title}>{title}</h2>

                    {showContact && (
                        <>
                            <h4 className={styles.subText}>Still Have Questions?</h4>
                            <p className={styles.description}>
                                Can't find the answer you're looking for? Please contact with our customer service.
                            </p>
                            <button className={styles.contactBtn}>Contact Us</button>
                        </>
                    )}
                </div>

                {/* Right Column */}
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.open : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={styles.questionText}>{faq.question}</span>
                                <ChevronDown size={20} className={styles.icon} />
                            </button>

                            {activeIndex === index && (
                                <div className={styles.answer}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
