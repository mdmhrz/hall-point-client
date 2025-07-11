import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';



export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null);
    console.log(user);



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

    //test for mobile and pc both login 
    // const handleGoogleSignIn = async () => {
    //     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    //     if (isMobile) {
    //         return signInWithRedirect(auth, googleProvider);
    //     } else {
    //         return signInWithPopup(auth, googleProvider);
    //     }
    // };






    // for observe logged in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
    }, []);


    // for logout user
    const logOut = () => {
        return signOut(auth)
    }

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