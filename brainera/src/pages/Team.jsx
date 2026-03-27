import React from 'react';
import PageHeader from '../components/PageHeader';
import { Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import styles from './Team.module.css';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';

// Import assets
import teacher5 from '../assets/teacher-5.jpg';
import teacher6 from '../assets/teacher-6.jpg';
import teacher7 from '../assets/teacher-7.jpg';
import teacher8 from '../assets/teacher-8.jpg';
import testimonial1 from '../assets/testimonials-picture-1.jpg';
import testimonial2 from '../assets/testimonials-picture-2.jpg';
import testimonial3 from '../assets/testimonials-picture-3.jpg';
import testimonial4 from '../assets/testimonials-picture-4-1.jpg';

const Team = () => {
    const teamMembers = [
        {
            name: "Sophia Langford",
            role: "Senior Language Instructor",
            image: testimonial1
        },
        {
            name: "Daniel Yu",
            role: "Mathematics Specialist",
            image: testimonial2
        },
        {
            name: "Isabella Moreno",
            role: "Science Educator",
            image: testimonial3
        },
        {
            name: "James O'Neal",
            role: "Tech & AI Mentor",
            image: testimonial4
        },
        {
            name: "Sarah Johnson",
            role: "Digital Marketing Expert",
            image: teacher5
        },
        {
            name: "Michael Chen",
            role: "Full-Stack Developer",
            image: teacher6
        },
        {
            name: "Emily Davis",
            role: "UI/UX Design Coach",
            image: teacher7
        },
        {
            name: "David Wilson",
            role: "Entrepreneurship Guide",
            image: teacher8
        }
    ];

    return (
        <>
            <PageHeader title="Our Teachers" breadcrumb="Our Teachers" />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={member.image} alt={member.name} />
                                    <div className={styles.socialOverlay}>
                                        <a href="#"><Facebook size={18} /></a>
                                        <a href="#"><Twitter size={18} /></a>
                                        <a href="#"><Instagram size={18} /></a>
                                    </div>
                                    <div className={styles.shareIcon}>
                                        <Share2 size={16} />
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.name}>{member.name}</h3>
                                    <p className={styles.role}>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQ data={[
                {
                    question: "What qualifications do your teachers have?",
                    answer: "Our teachers are industry experts with years of practical experience and academic credentials in their respective fields. We rigorously vet every instructor to ensure high-quality education."
                },
                {
                    question: "Are the instructors available for 1-on-1 support or mentoring?",
                    answer: "Yes, many of our premium courses include options for 1-on-1 mentoring sessions. You can also ask questions directly in the course discussion forums."
                },
                {
                    question: "How are teachers selected for each course?",
                    answer: "Teachers are selected based on their expertise, teaching experience, and ability to engage students. We look for professionals who are not only knowledgeable but also passionate about teaching."
                },
                {
                    question: "Can I view a teacher's background before enrolling in a course?",
                    answer: "Absolutely. Each course page includes a detailed instructor profile highlighting their experience, past projects, and student reviews."
                },
                {
                    question: "Do the instructors update their course content regularly?",
                    answer: "Yes, our instructors regularly update course materials to reflect the latest industry trends, tools, and best practices."
                }
            ]} />

            <CTA />
        </>
    );
};

export default Team;
