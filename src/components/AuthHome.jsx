import React from 'react';
import { Link, Outlet } from 'react-router';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';

const AuthHome = () => {
    return (
        <div>
            <Login></Login>
            <Register></Register>
        </div>
    );
};

export default AuthHome;