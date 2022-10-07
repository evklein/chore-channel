import { Grid, Typography } from "@mui/material";
import { previousSunday } from "date-fns";
import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useState } from "react";
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
    orderBy("completed_on", "desc"),
  ));

  const [currentWeekStartDate] = useState(previousSunday(new Date()));

  const getCompletionRate = () => {
    var totalGoalsToComplete = 0;
    var totalGoalsCompleted = 0;
    goals?.forEach((goal) => {
      totalGoalsToComplete += goal.required_completions;
    });

    events?.forEach((event) => {
      if (event.completed_on.seconds * 1000 > currentWeekStartDate.getTime()) totalGoalsCompleted++;
    });

    return Math.round(totalGoalsCompleted / totalGoalsToComplete * 100);
  }

  return (
    <>
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="h4" align="left" sx={{ marginX: 1 }}>Workouts</Typography>
            </Grid>
            <Grid item md={3}>
                <Typography variant="h6" align="left">Week of <b>{currentWeekStartDate.toLocaleDateString()}</b></Typography>
            </Grid>
            <Grid item md={7}>
                <Typography variant="h5" align="right">Completion: {getCompletionRate()}%</Typography>
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
