import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate, } from 'react-router';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
            console.log(result.user);
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