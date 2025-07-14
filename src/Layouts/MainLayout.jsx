import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <div className='mb-[64px]'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;