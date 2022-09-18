import { Divider, Grid, Typography } from "@mui/material";
import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChoreCard from "./ChoreCard";

interface ChoresProps {
    firestore: Firestore,
}

function Chores(props: ChoresProps) {
  const [chores] = useCollectionData(query(
    collection(props.firestore, "chores"),
    orderBy("name"),
  ));

  return (
    <>
      <Typography variant="h5" align="left" sx={{ marginX: 2, marginY: 1}}>Dailies</Typography>
      <Grid container spacing={0}>
      {chores && chores.filter((chore) => { return chore["period"] === 1; }).map(choreData => (
        <Grid item xs={12} sm={6} md={3}>
          <ChoreCard firestore={props.firestore} key={choreData["name"]} choreData={choreData} />
        </Grid>
      ))}
      </Grid>
      <Divider variant="middle" />
      <Typography variant="h5" align="left" sx={{ marginX: 2, marginY: 1}}>Weeklies</Typography>
      <Grid container spacing={0}>
      {chores && chores.filter((chore) => { return chore["period"] === 5 || chore["period"] === 7; }).map(choreData => (
        <Grid item xs={12} sm={6} md={3}>
          <ChoreCard firestore={props.firestore} key={choreData["name"]} choreData={choreData} />
        </Grid>
      ))}
      </Grid>
      <Divider variant="middle" />
      <Typography variant="h5" align="left" sx={{ marginX: 2, marginY: 1}}>Biweeklies</Typography>
      <Grid container spacing={0}>
      {chores && chores.filter((chore) => { return chore["period"] === 14; }).map(choreData => (
        <Grid item xs={12} sm={6} md={3}>
          <ChoreCard firestore={props.firestore} key={choreData["name"]} choreData={choreData} />
        </Grid>
      ))}
      </Grid>
      <Divider variant="middle" />
      <Typography variant="h5" align="left" sx={{ marginX: 2, marginY: 1}}>Monthlies</Typography>
      <Grid container spacing={0}>
      {chores && chores.filter((chore) => { return chore["period"] === 30; }).map(choreData => (
        <Grid item xs={12} sm={6} md={3}>
          <ChoreCard firestore={props.firestore} key={choreData["name"]} choreData={choreData} />
        </Grid>
      ))}
      </Grid>
    </>

  );
}

export default Chores;
