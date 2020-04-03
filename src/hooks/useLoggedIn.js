import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const useLoggedIn = () => {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ loggedIn: true, email: user.email });
      } else {
        setUser({ loggedIn: false });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};
