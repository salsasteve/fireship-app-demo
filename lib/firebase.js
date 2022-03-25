import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';

const devFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_dev_apiKey,
  authDomain: process.env.NEXT_PUBLIC_dev_authDomain,
  projectId: process.env.NEXT_PUBLIC_dev_projectId,
  storageBucket: process.env.NEXT_PUBLIC_dev_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_dev_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_dev_appId,
  measurementId: process.env.NEXT_PUBLIC_dev_measurementId,
};

const firebaseApp = !getApps().length
  ? initializeApp(devFirebaseConfig)
  : getApp();

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
