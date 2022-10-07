import { Grid, Typography } from "@mui/material";
import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GoalLogs from "./GoalLogs";
import GoalSection from "./GoalSection";

interface GoalProps {
    firestore: Firestore,
}

function Goals(props: GoalProps) {
  const [goals] = useCollectionData(query(
    collection(props.firestore, "weekly-goals"),
    orderBy("name"),
  ));

  const [events] = useCollectionData(query(
    collection(props.firestore, "events"),
    orderBy("completed_on")
  ));

  console.log(events);

  return (
    <>
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="h4" align="left" sx={{ marginX: 1 }}>Workouts</Typography>
            </Grid>
            <Grid item md={3}>
                <Typography variant="h6" align="left">Week of <b>October 2, 2022</b></Typography>
            </Grid>
            <Grid item md={7}>
                <Typography variant="h5" align="right">Completion: 70%</Typography>
            </Grid>
        </Grid>
        {goals?.map((goal, index) => {
            return (
                <GoalSection firestore={props.firestore} key={index} goal={goal} />
            );
        })}
        <GoalLogs events={events} />
    </>
  );
}

export default Goals;
