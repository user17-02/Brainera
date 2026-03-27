import React from 'react';
import PageHeader from '../components/PageHeader';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const PricingPage = () => {
    return (
        <>
            <PageHeader title="Pricing" breadcrumb="Pricing" />

            <Pricing />

            <Testimonials />

            <FAQ />

            <CTA />
        </>
    );
};

export default PricingPage;
