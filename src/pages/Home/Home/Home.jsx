import React from 'react';
import Banner from '../Banner/Banner';
import Membership from '../Membership/Membeship';
import FAQ from '../FAQ/FAQ';
import MealsByCategory from '../MealsByCategory/MealsByCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <Membership></Membership>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;