import React from 'react';
import Banner from '../Banner/Banner';
import Membership from '../Membership/Membeship';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Membership></Membership>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;