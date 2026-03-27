import React from 'react';
import PageHeader from '../components/PageHeader';
import { Clock, User, Calendar } from 'lucide-react';
import styles from './BlogPage.module.css';
import CTA from '../components/CTA';

// Import images
import img1 from '../assets/woman-teacher-teaching-online-coronavirus-and-onl-2024-10-18-09-25-05-utc-1-768x508.jpg';
import img2 from '../assets/student-showing-incandescent-light-bulb-and-led-la-2025-03-18-00-00-50-utc-1-768x480.jpg';
import img3 from '../assets/computer-with-online-learning-course-2025-03-18-22-20-42-utc-1-768x512.jpg';
import img4 from '../assets/cool-young-black-guy-against-isolated-white-backgr-2024-10-18-06-58-46-utc-1-1.png';
import img5 from '../assets/asian-woman-student-standing-with-laptop-coffee-an-2025-01-08-04-43-37-2utc-1-1-1.png';
import img6 from '../assets/web-designer-pointing-at-mockups-of-mobile-applica-2025-02-20-03-51-00-utc-1.jpg';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: "Top 5 Skills You’ll Gain from Our Online Courses",
            excerpt: "In today's fast-moving digital world, learning new skills is essential. Discover the top 5 skills our courses cover.",
            date: "June 28, 2025",
            author: "John Doe",
            image: img1,
            category: "Career"
        },
        {
            id: 2,
            title: "Interactive Learning: Why Engagement Matters",
            excerpt: "Engagement is the key to retention. Learn how our interactive modules keep students motivated.",
            date: "June 19, 2025",
            author: "Sarah Smith",
            image: img2,
            category: "Education"
        },
        {
            id: 3,
            title: "Benefits of Lifetime Access in E-Learning",
            excerpt: "Why lifetime access is a game-changer for continuous learning and professional development.",
            date: "June 15, 2025",
            author: "Mike Johnson",
            image: img3,
            category: "Tips"
        },
        {
            id: 4,
            title: "Choosing the Right Course for Your Career Goals",
            excerpt: "Not sure where to start? Here's a guide to matching your career aspirations with the right coursework.",
            date: "June 10, 2025",
            author: "Emily Davis",
            image: img4,
            category: "Career"
        },
        {
            id: 5,
            title: "The Future of Remote Education: Trends to Watch",
            excerpt: "Remote education is here to stay. We explore the emerging trends that will shape the future of learning.",
            date: "June 05, 2025",
            author: "Chris Wilson",
            image: img5,
            category: "Trends"
        },
        {
            id: 6,
            title: "How to Stay Motivated During Self-Paced Courses",
            excerpt: "Self-paced learning requires discipline. Here are practical tips to keep your momentum going.",
            date: "May 28, 2025",
            author: "Jessica Lee",
            image: img6,
            category: "Productivity"
        }
    ];

    return (
        <>
            <PageHeader title="Blog" breadcrumb="Blog" />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.tagline}>Blog & News</span>
                        <h2 className={styles.title}>Stay Informed With Expert Insights</h2>
                        <p className={styles.description}>
                            Explore the latest trends, tips, and updates in online education. Our curated articles help you stay ahead.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        {posts.map((post) => (
                            <div key={post.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={post.image} alt={post.title} />
                                    <span className={styles.category}>{post.category}</span>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.meta}>
                                        <div className={styles.metaItem}>
                                            <Calendar size={14} />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <User size={14} />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                    <h3 className={styles.postTitle}>{post.title}</h3>
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                    <a href="#" className={styles.readMore}>Read More →</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className={styles.pagination}>
                        <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
                        <span className={styles.pageNumber}>2</span>
                        <span className={styles.pageNumber}>3</span>
                        <span className={styles.nextInfo}>Next &raquo;</span>
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
};

export default BlogPage;
