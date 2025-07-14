import React from 'react';
import UserDashboardOverview from './UserDashboardOverview';
import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import AdminDashboardOverview from './AdminDashboardOverview';
import { Helmet } from 'react-helmet-async';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();
    const { user } = useAuth()

    return (

        <>
            <Helmet>
                <title>Dashboard | HallPoint</title>
            </Helmet>
            <div>

                {user && !roleLoading && role === 'user' && <UserDashboardOverview></UserDashboardOverview>}
                {user && !roleLoading && role === 'admin' && <AdminDashboardOverview></AdminDashboardOverview>}
            </div>
        </>
    );
};

export default DashboardHome;