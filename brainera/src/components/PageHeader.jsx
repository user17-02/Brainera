import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, breadcrumb }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.breadcrumb}>
                    <Link to="/" className={styles.link}>Home</Link>
                    <span className={styles.separator}>&gt;</span>
                    <span className={styles.current}>{breadcrumb}</span>
                </div>
            </div>
        </section>
    );
};

export default PageHeader;
