import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Categories from '../components/Categories';
import About from '../components/About';
import Partners from '../components/Partners';
import CourseCategories from '../components/CourseCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import Courses from '../components/Courses';
import Process from '../components/Process';
import Features from '../components/Features'; // Note: Features might be specific to Home?
import Testimonials from '../components/Testimonials';
import Instructors from '../components/Instructors';
import AppDownload from '../components/AppDownload';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Blog from '../components/Blog';
import CTA from '../components/CTA';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Categories />
            <About />
            <Partners />
            <CourseCategories />
            <WhyChooseUs />
            <Courses />
            <Process />
            <Features />
            <Testimonials />
            <Instructors />
            <AppDownload />
            <Pricing />
            <FAQ />
            <Blog />
            <CTA />
        </>
    );
};

export default Home;
