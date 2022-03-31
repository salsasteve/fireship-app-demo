import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from 'firebase/firestore';
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

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
