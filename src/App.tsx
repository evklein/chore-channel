import "./App.css";

import firebase from "firebase/compat/app"; 
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData, getFirestore, serverTimestamp } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./auth/SignIn";
import Chores from "./chores/Chores";

const firebaseConfig = require("./firebase-config.json");
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.firestore(firebaseApp);

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