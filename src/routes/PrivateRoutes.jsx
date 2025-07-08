import React from 'react';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to='/auth/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;