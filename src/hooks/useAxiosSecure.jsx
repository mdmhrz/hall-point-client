import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // ✅ this sends the HttpOnly cookie
});

const useAxiosSecure = () => {
    const { logout } = useAuth(); // Optional: use this if 401/403
    const navigate = useNavigate();

    // Optional: Response interceptor to handle auth errors
    axiosSecure.interceptors.response.use(
        res => res,
        err => {
            const status = err?.response?.status;
            if (status === 401 || status === 403) {
                logout(); // Optional: clean up local state
                navigate('/auth/login'); // or show error
            }
            return Promise.reject(err);
        }
    );




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



