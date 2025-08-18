
import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: `https://hall-point-server.vercel.app`
})
const useAxios = () => {
    return axiosInstance
};

export default useAxios;



