import React from 'react';
import PageHeader from '../components/PageHeader';
import About from '../components/About'; // Re-using About component
import Values from '../components/Values';
import Process from '../components/Process';
import Instructors from '../components/Instructors';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA'; // CTA seems to be part of the footer block in landing but useful here too.
import Partners from '../components/Partners'; // Maybe reused? The extracted text had "Trusted by..."

const AboutUs = () => {
    return (
        <>
            <PageHeader title="About Us" breadcrumb="About" />
            <About />
            <Values />
            <Partners /> {/* The text extracted had "Trusted by 5,000..." so likely includes Partners */}
            <Process />
            <Instructors />
            <FAQ />
            <CTA />
        </>
    );
};

export default AboutUs;
