import { Chip, Divider, Grid, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { previousSunday } from "date-fns";
import { collection, DocumentData, Firestore, limit, orderBy, query } from "firebase/firestore";
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
    limit(20),
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

  const getCompletionsForGoal = (goal: DocumentData) => {
    var totalCompletionsForGoal = 0;
    events?.forEach((event) => {
        if (event.completed_on.seconds * 1000 > currentWeekStartDate.getTime() && event.event_type === goal.name) {
            totalCompletionsForGoal++;
        }
    });
    return totalCompletionsForGoal;
  }

  return (
    <>
        <Grid container spacing={2}>
            <Grid item md={5}>
                <Typography variant="h4" align="left" sx={{ marginX: 1, marginY: 1 }}>
                  Goals <Chip color="info" variant="filled" size="medium" label={"Week of " + currentWeekStartDate.toLocaleDateString()} />
                </Typography>
            </Grid>
            <Grid item md={7}>
                <Typography variant="h5" align="right" sx={{marginX: 1, marginY: 2}}>Completion:&nbsp;
                  <b>{getCompletionRate()}%</b>
                </Typography>
            </Grid>
        </Grid>
        <Divider variant="middle" />
        {goals?.map((goal, index) => {
            return (
                <GoalSection firestore={props.firestore} key={index} goal={goal} completions={getCompletionsForGoal(goal)} />
            );
        })}
        <Divider variant="middle" sx={{ marginY: 1 }}/>
        <GoalLogs events={events} />
    </>
  );
}

export default Goals;
