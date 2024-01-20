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
      throw new Error('Error signing up with email and password', error.message);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setCookie('user', userCredential.user, { path: '/' });
    } catch (error) {
      throw new Error(`${email} with that password not in our database`, error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error('Error sending password reset email', error.message);
    }
  };
  
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      removeCookie('user', { path: '/' });
    } catch (error) {
      throw new Error('Error signing out', error.message);
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
