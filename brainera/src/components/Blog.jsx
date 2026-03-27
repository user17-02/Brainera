import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import data from '../data.json';

// Import images
import img1 from '../assets/woman-teacher-teaching-online-coronavirus-and-onl-2024-10-18-09-25-05-utc-1-768x508.jpg';
import img2 from '../assets/student-showing-incandescent-light-bulb-and-led-la-2025-03-18-00-00-50-utc-1-768x480.jpg';
import img3 from '../assets/computer-with-online-learning-course-2025-03-18-22-20-42-utc-1-768x512.jpg';

const Blog = () => {
    // Manually map image assets to the data indices
    const images = [img1, img2, img3];

    // Split posts: 1 featured, rest side
    const featuredPost = data.blog[0];
    const sidePosts = data.blog.slice(1);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <span className={styles.tagline}>Blog & News</span>
                        <h2 className={styles.title}>Stay Informed With Expert Insights</h2>
                    </div>
                    <p className={styles.description}>
                        Explore the latest trends, tips, and updates in online education. Our curated articles help you stay ahead with expert advice, learning strategies, and student success stories.
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/blog" style={{ color: '#2b95a5', fontWeight: '700', textDecoration: 'none' }}>View All Posts &rarr;</Link>
                    </div>
                </div>

                <div className={styles.grid}>

                    {/* Featured Post (Left) */}
                    <div className={styles.featuredCard}>
                        <div className={styles.featuredImageWrapper}>
                            <img
                                src={images[0]}
                                alt={featuredPost.title}
                                className={styles.featuredImage}
                            />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.metaInfo}>
                                <Clock className={styles.clockIcon} />
                                <span>{featuredPost.date}</span>
                            </div>
                            <h3 className={styles.postTitle}>{featuredPost.title}</h3>
                            <p className={styles.excerpt}>{featuredPost.excerpt}</p>
                        </div>
                    </div>

                    {/* Side Posts (Right) */}
                    <div className={styles.sideList}>
                        {sidePosts.map((post, index) => (
                            <div key={post.id} className={styles.sideItem}>
                                <div className={styles.sideImageWrapper}>
                                    <img
                                        src={images[index + 1]}
                                        alt={post.title}
                                        className={styles.sideImage}
                                    />
                                </div>
                                <div className={styles.sideContent}>
                                    <div className={styles.metaInfo}>
                                        <Clock className={styles.clockIcon} />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className={styles.sideTitle}>{post.title}</h3>
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Blog;
