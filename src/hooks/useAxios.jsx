
import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: `https://hall-point-server-51yjqpin9-mobarak-hossain-razus-projects.vercel.app`
})
const useAxios = () => {
    return axiosInstance
};

export default useAxios;
