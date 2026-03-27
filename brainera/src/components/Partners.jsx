import React from 'react';
import styles from './Partners.module.css';
import logo1 from '../assets/partner-logo-1-3.png';
import logo2 from '../assets/partner-logo-2-1.png';
import logo3 from '../assets/partner-logo-3-1.png';
import logo4 from '../assets/partner-logo-4-1.png';
import logo5 from '../assets/partner-logo-5-1.png';

const Partners = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h3 className={styles.title}>Trusted by 5,000+ worldwide partners</h3>

                <div className={styles.logoGrid}>
                    <img src={logo1} alt="Logoipsum" className={styles.logo} />
                    <img src={logo2} alt="Logoipsum" className={styles.logo} />
                    <img src={logo3} alt="Logoipsum" className={styles.logo} />
                    <img src={logo4} alt="Logoipsum" className={styles.logo} />
                    <img src={logo5} alt="Logoipsum" className={styles.logo} />
                </div>
            </div>
        </section>
    );
};

export default Partners;
