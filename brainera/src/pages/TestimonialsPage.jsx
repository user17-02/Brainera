import React from 'react';
import PageHeader from '../components/PageHeader';
import styles from './TestimonialsPage.module.css';
import CTA from '../components/CTA';

// Import assets
import img1 from '../assets/rating-1.jpg';
import img2 from '../assets/rating-2.jpg';
import img3 from '../assets/rating-3.jpg';
import img4 from '../assets/rating-4.jpg'; // Assuming this exists based on file list
import img5 from '../assets/testimonials-picture-1.jpg';
import img6 from '../assets/testimonials-picture-2.jpg';
import img7 from '../assets/testimonials-picture-3.jpg';
import img8 from '../assets/testimonials-picture-4-1.jpg';

const TestimonialsPage = () => {
    const testimonials = [
        {
            id: 1,
            name: "Chloe Bennett",
            role: "UX Designer",
            image: img1,
            content: "I love how easy it is to follow each course module here. The instructors are top-notch and the content is very relevant to current industry standards."
        },
        {
            id: 2,
            name: "Nathan Cole",
            role: "Software Developer",
            image: img2,
            content: "Great instructors and practical topics made learning very enjoyable. I've recommended Brainera to all my colleagues looking to upskill."
        },
        {
            id: 3,
            name: "Amelia Grant",
            role: "Marketing Specialist",
            image: img3,
            content: "The platform helped me stay focused and learn faster from anywhere. The mobile app is a game-changer for my daily commute."
        },
        {
            id: 4,
            name: "James Wilson",
            role: "Data Analyst",
            image: img4,
            content: "The data science curriculum is incredibly comprehensive. The hands-on projects really helped me build a portfolio that got me hired."
        },
        {
            id: 5,
            name: "Sophie Clark",
            role: "Graphic Designer",
            image: img5,
            content: "Creative, inspiring, and practical. I learned techniques that I could immediately apply to my freelance projects. Highly recommended!"
        },
        {
            id: 6,
            name: "Lucas Martinez",
            role: "Project Manager",
            image: img6,
            content: "The certification I earned here gave me the confidence to apply for senior roles. The content is structured perfectly for busy professionals."
        },
        {
            id: 7,
            name: "Grace Kim",
            role: "Content Creator",
            image: img7,
            content: "I was struggling to understand SEO until I took the course here. Now my blog traffic has tripled! Thank you Brainera."
        },
        {
            id: 8,
            name: "Oliver Brown",
            role: "Entrepreneur",
            image: img8,
            content: "As a business owner, I needed to understand digital marketing fast. This platform delivered exactly what I needed without the fluff."
        }
    ];

    return (
        <>
            <PageHeader title="Testimonials" breadcrumb="Testimonials" />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.tagline}>Testimonials</span>
                        <h2 className={styles.title}>What Our Learners Say</h2>
                        <p className={styles.description}>
                            Discover how Brainera has transformed learning experiences for students across the globe. Real voices, real impact—see what they have to say about their journey with us.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        {testimonials.map((item) => (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.profile}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.meta}>
                                        <h4 className={styles.name}>{item.name}</h4>
                                        <span className={styles.role}>{item.role}</span>
                                    </div>
                                </div>
                                <p className={styles.quote}>"{item.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
};

export default TestimonialsPage;
