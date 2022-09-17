import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "firebase/compat/app";

interface SignInProps {
  auth: Auth,
}

function SignIn(props: SignInProps) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider;
    signInWithPopup(props.auth, provider);
  }

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

export default SignIn;
