import { auth, firestore } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export function useUserData() {
  const [user, setUser] = useState({});
  const [username, setUserName] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        // Logged Out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    let unsubscribe;

    try {
      const currentUser = user.uid;
      unsubscribe = onSnapshot(doc(firestore, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data()?.username);
          console.log(username);
        } else {
          console.log('No such document!');
        }
      });
    } catch (error) {
      setUserName(null);
    }

    return unsubscribe;
  }, [user, username]);

  return { user, username };
}
