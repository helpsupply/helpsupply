import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    isInitializing: true,
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth({
        isInitializing: false,
        isLoggedIn: user !== null,
        user: user,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return auth;
};
