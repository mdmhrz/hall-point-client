import React from 'react';
import Banner from '../Banner/Banner';
import Membership from '../Membership/Membeship';
import FAQ from '../FAQ/FAQ';
import MealsByCategory from '../MealsByCategory/MealsByCategory';
import HowItWorks from '../HowItWorks/HowItWorks';
import { Helmet } from 'react-helmet-async';
import StudentTestimonials from '../StudentTestimonials/StudentTestimonials';
import AppFeatures from '../AppFeature/AppFeature';
import OurPartners from '../OurPartners/OurPartners';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | HallPoint</title>
            </Helmet>

            <div>
                <Banner></Banner>
                <MealsByCategory></MealsByCategory>
                <HowItWorks></HowItWorks>
                <AppFeatures></AppFeatures>
                <Membership></Membership>
                <OurPartners></OurPartners>
                <StudentTestimonials></StudentTestimonials>
                <FAQ></FAQ>
            </div>
        </>
    );
};

export default Home;