import React from 'react';
import Banner from '../Banner/Banner';
import Membership from '../Membership/Membeship';
import FAQ from '../FAQ/FAQ';
import MealsByCategory from '../MealsByCategory/MealsByCategory';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <HowItWorks></HowItWorks>
            <Membership></Membership>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;