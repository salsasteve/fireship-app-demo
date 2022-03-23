import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Enter({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function SignInButton() {
  //TODO: Add Try/Catch
  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} /> Sign in with Google
      </button>
      <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button>
    </>
  );
}

function UsernameForm() {}
