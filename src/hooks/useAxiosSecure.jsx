import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    }, error => Promise.reject(error));

    // axiosSecure.interceptors.response.use(
    //     res => res,
    //     error => {
    //         const status = error.response?.status;
    //         if (status === 403) {
    //             navigate('/forbidden');
    //         } else if (status === 401) {
    //             logout().then(() => navigate('/login')).catch(console.error);
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return axiosSecure;
};

export default useAxiosSecure;