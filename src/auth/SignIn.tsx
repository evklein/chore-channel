import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface SignInProps {
    auth: Auth,
    provider: GoogleAuthProvider,
}

function SignIn(props: SignInProps) {
    const signInWithGoogle = () => {;
      signInWithPopup(props.auth, props.provider);
    }

    return (
      <button onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    );
}

export default SignIn;