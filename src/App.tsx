import "./App.css";

import "firebase/compat/auth";
import firebase from "firebase/compat/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./auth/SignIn";
import Chores from "./chores/Chores";

const firebaseConfig = require("./firebase-config.json");
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [user] = useAuthState(auth);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className="App">
          { user ? <Chores firestore={firestore} /> : <SignIn auth={auth} />}
        </div>
    </ThemeProvider>
  );
}

export default App;
