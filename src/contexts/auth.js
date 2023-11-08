import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../../config';
import { useCookies } from 'react-cookie';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const storedUser = cookies.user;
    if (storedUser) {
      setUser(storedUser);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });

      return () => unsubscribe();
    }
  }, [cookies.user]);

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setCookie('user', userCredential.user, { path: '/' });
    } catch (error) {
      console.error('Error signing up with email and password', error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setCookie('user', userCredential.user, { path: '/' });
    } catch (error) {
      console.error('Error signing in with email and password', error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email', error);
      throw error; 
    }
  };
  
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      removeCookie('user', { path: '/' });
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const values = {
    user,
    signUpWithEmailAndPassword,
    signInWithEmail,
    resetPassword,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
