import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate, } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const axiosInstance = useAxios()

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(async (result) => {
            console.log('hello');
            const user = result.user
            console.log('Google signing', user);



            //Update userInfo in the database
            const userInfo = {
                email: user.email,
                name: user.displayName,
                role: 'user', //default role
                badge: 'bronze', //default badge
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            }

            const userRes = await axiosInstance.post('/users', userInfo);
            console.log(userRes.data);

            navigate(from)
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-outline btn-primary w-full flex items-center justify-center gap-3"
        >
            <FaGoogle size={24} />
            Continue with Google
        </button>

    );
};

export default SocialLogin;