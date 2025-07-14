import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `https://hall-point-server-51yjqpin9-mobarak-hossain-razus-projects.vercel.app`,
    withCredentials: true, // ✅ this sends the HttpOnly cookie
});

const useAxiosSecure = () => {
    const { logOut } = useAuth(); // Optional: use this if 401/403
    const navigate = useNavigate();


    axiosSecure.interceptors.response.use(
        res => res,
        error => {
            const status = error.response?.status;
            if (status === 403) {
                console.log('Status 403 from second line');
                navigate('/forbidden');
            } else if (status === 401) {
                logOut().then(() => navigate('/auth/login')).catch(console.error);
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;



