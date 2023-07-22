import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [loading , setLoading ] = useState(true);
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const gitHubUser = () => {
        setLoading(true)
        return signInWithPopup(auth,gitHubProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo
        });
      };

      useEffect(() => {
         const unsubscribe = onAuthStateChanged(auth, loggedUser => {
             setUser(loggedUser);
             setLoading(false);
         })
         return() => {
            return unsubscribe();
         }
      },[])

      const authInfo = {loading, user, createUser, signIn , googleSignIn, logOut , updateUserProfile , gitHubUser , resetPassword}
      return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );

};

export default AuthProvider;