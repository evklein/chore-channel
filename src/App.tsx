import './App.css';
import React from 'react';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, DocumentData, getFirestore, orderBy, query, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './auth/SignIn';

let firebaseConfig = require('./firebase-config.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);
const db = firebase.firestore();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user] = useAuthState(auth);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className="App">
          { user ? <ChoresComponent /> : <SignIn auth={auth} />}
        </div>
    </ThemeProvider>
  );
}

function ChoresComponent() {
  const [chores] = useCollectionData(query(
    collection(firestore, 'chores'),
    orderBy('name'),
  ));

  return (
      <Grid container spacing={0}>
        {chores && chores.map(c => (
          <Grid item xs={12} sm={6} md={3}>
            <ChoreCard key={c.id} chore={c} />
          </Grid>
        ))}
      </Grid>
  );
}

interface ChoreProps{
  chore: DocumentData;
}

function ChoreCard(props: ChoreProps) {
  const { id, name, last_completed, period } = props.chore;
  let lastCompletedDate = new Date(1970, 0, 1);
  lastCompletedDate.setSeconds(last_completed["seconds"]);

  let now = Date.now() / 1000;

  const updateLastCompleteTime = async() => {
    db.collection('chores').doc(name).update({ last_completed: serverTimestamp() });
  }

  var status = "";
  if (period === "Daily") {
    if (now - last_completed["seconds"] > 60 * 60 * 12) {
      status = "Due Today";

      if (now - last_completed["seconds"] > 60 * 60 * 24) {
        status = "Overdue";
      }
    }
  }
  if (period === "Weekly") {
    if (now - last_completed["seconds"] > 60 * 60 * 24 * 7) {
      status = "Due Today";

      if (now - last_completed["seconds"] > 60 * 60 * 24 * 9) {
        status = "Overdue";
      }
    }
  }
  if (period === "Monthly") {
    if (now - last_completed["seconds"] > 60 * 60 * 24 * 29) {
      status = "Due Today";

      if (now - last_completed["seconds"] > 60 * 60 * 24 * 31) {
        status = "Overdue";
      }
    }
  }

  var tag;
  if (status === "Overdue") {
    tag = <Chip label="Overdue" color="error" sx={{ ml: 1 }} />;
  }
  if (status === "Due Today") {
    tag = <Chip label="Due Today" color="warning" sx={{ ml: 1 }} />;
  }
  
  return (
    <Card sx={{ maxWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          { period }
        </Typography>
        <Typography variant="body2">
          Last Completed: { lastCompletedDate.toLocaleString('en-US', {timeZone: "Etc/GMT+8"}) }
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => {
          updateLastCompleteTime().then(() => {});
        }}>
          Completed
        </Button>
        { tag }
      </CardActions>
    </Card>
  );
}

export default App;