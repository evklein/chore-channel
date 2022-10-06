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
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanelUnstyled } from "@mui/base";

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
  const [selectedTab, selectTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, tabValue: number) => {
    selectTab(tabValue);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className="App">
          { user ?
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Chores" />
                  <Tab label="Workouts" />
                </Tabs>
              </Box>
              <div hidden={selectedTab !== 0}>
                <Chores firestore={firestore} /> 
              </div>
              <div hidden={selectedTab !== 1}>
              </div>
            </>


          : <SignIn auth={auth} />}
        </div>
    </ThemeProvider>
  );
}

export default App;
