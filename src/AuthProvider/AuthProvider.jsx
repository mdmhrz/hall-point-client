import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import axios from 'axios';



export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null);
    // console.log(user);



    // for Register user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // For signIn with google Popup
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }




    // for logout user
    const logOut = () => {
        axios.post("https://hall-point-server.vercel.app/logout", {}, { withCredentials: true })
            .catch(err => console.log("Logout error", err));
        return signOut(auth);
    };

    // for login user

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // For user update
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    };



    // Password reset or Forgot Password click

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    // for observe logged in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)

            //JWT related
            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post('https://hall-point-server.vercel.app/jwt', userData, {
                    withCredentials: true
                })
                    .then(res => {
                        // console.log('JWT response:', res.data);
                    })
                    .catch(error => {
                        console.error('JWT error:', error.response?.data || error.message);
                    });
            }

        });
        return () => {
            unsubscribe();
        }
    }, []);




    const authInfo = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUserProfile,
        signInWithGoogle,
        forgotPassword,
    }

    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;