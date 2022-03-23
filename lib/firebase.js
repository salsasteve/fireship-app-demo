import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const devFirebaseConfig = {
  apiKey: process.env.dev_apiKey,
  authDomain: process.env.dev_authDomain,
  databaseURL: process.env.dev_databaseURL,
  projectId: process.env.dev_projectId,
  storageBucket: process.env.dev_storageBucket,
  messagingSenderId: process.env.dev_messagingSenderId,
  appId: process.env.dev_appId,
  measurementId: process.env.dev_measurementId,
};

const app = initializeApp(devFirebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
