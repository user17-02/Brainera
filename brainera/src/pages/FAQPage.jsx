import React from 'react';
import PageHeader from '../components/PageHeader';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const FAQPage = () => {
    return (
        <>
            <PageHeader title="FAQ" breadcrumb="FAQ" />

            {/* About Courses */}
            <FAQ
                tagline="Courses"
                title="About Courses"
                showContact={false}
                data={[
                    { question: "How do I enroll in a course?", answer: "Simply browse our catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through a quick registration and payment process." },
                    { question: "Are all courses beginner-friendly?", answer: "Most of our courses are designed for beginners, but we also offer intermediate and advanced levels. Check the course prerequisites in the description to be sure." },
                    { question: "Do I get a certificate after completion?", answer: "Yes! Upon successfully completing a course and its assessments, you will receive a verified certificate that you can download and share on your LinkedIn profile." },
                    { question: "Can I access classes on mobile?", answer: "Absolutely. Our platform is fully responsive, and we also have a dedicated mobile app for iOS and Android so you can learn anytime, anywhere." },
                    { question: "What payment methods are supported?", answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and various local payment methods depending on your region." },
                    { question: "Is there any refund policy available?", answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course content, you can request a full refund within the first 30 days." }
                ]}
            />

            {/* About Teachers */}
            <div style={{ backgroundColor: '#f9fafb' }}>
                <FAQ
                    tagline="Instructors"
                    title="About Teachers"
                    showContact={false}
                    data={[
                        { question: "What qualifications do your teachers have?", answer: "Our teachers are industry experts with years of practical experience and academic credentials in their respective fields. We rigorously vet every instructor to ensure high-quality education." },
                        { question: "Are the instructors available for 1-on-1 support or mentoring?", answer: "Yes, many of our premium courses include options for 1-on-1 mentoring sessions. You can also ask questions directly in the course discussion forums." },
                        { question: "How are teachers selected for each course?", answer: "Teachers are selected based on their expertise, teaching experience, and ability to engage students. We look for professionals who are not only knowledgeable but also passionate about teaching." },
                        { question: "Can I view a teacher's background before enrolling in a course?", answer: "Absolutely. Each course page includes a detailed instructor profile highlighting their experience, past projects, and student reviews." },
                        { question: "Do the instructors update their course content regularly?", answer: "Yes, our instructors regularly update course materials to reflect the latest industry trends, tools, and best practices." }
                    ]}
                />
            </div>

            {/* About Pricing */}
            <FAQ
                tagline="Pricing"
                title="About Pricing"
                showContact={true}
                data={[
                    { question: "Is there a one-time payment or a subscription model?", answer: "We offer both! You can engage in a monthly subscription for access to all courses, or purchase individual courses for lifetime access." },
                    { question: "Are there any hidden fees or extra costs?", answer: "No hidden fees. The price you see is the price you pay, and all course materials are included." },
                    { question: "Do you offer discounts for students or groups?", answer: "Yes, we offer varying discounts for students with valid IDs and bulk pricing for corporate groups." },
                    { question: "Can I upgrade my plan later?", answer: "Yes, you can upgrade from a Basic to a Pro plan at any time from your account settings. The difference will be prorated." },
                    { question: "What is your refund or cancellation policy?", answer: "You can cancel your subscription at any time. For individual course purchases, we offer a 30-day money-back guarantee." }
                ]}
            />

            <CTA />
        </>
    );
};

export default FAQPage;
