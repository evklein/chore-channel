import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, ButtonGroup, Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { isSunday, nextSunday, previousSunday } from "date-fns";
import { collection, DocumentData, Firestore, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GoalLogs from "./GoalLogs";
import GoalSection from "./GoalSection";

interface GoalProps {
    firestore: Firestore,
    goalsSource: string,
    eventsSource: string,
}

function Goals(props: GoalProps) {
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(isSunday(new Date()) ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : previousSunday(new Date()));
  const [nextWeekStartDate, setNextWeekStartDate] = useState(nextSunday(new Date()));

  const [goals] = useCollectionData(query(
    collection(props.firestore, props.goalsSource),
    orderBy("name"),
  ));
  const [events] = useCollectionData(query(
    collection(props.firestore, props.eventsSource),
    where("completed_on", ">=", new Date(currentWeekStartDate.getFullYear(), currentWeekStartDate.getMonth(), currentWeekStartDate.getDate())),
    where("completed_on", "<", new Date(nextWeekStartDate.getFullYear(), nextWeekStartDate.getMonth(), nextWeekStartDate.getDate())),
    limit(20),
  ));


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

  const viewLastWeek = async() => {
    var now = new Date();
    setNextWeekStartDate(currentWeekStartDate);
    setCurrentWeekStartDate(isSunday(now) ? previousSunday(currentWeekStartDate) : previousSunday(now));
  }

  const viewNextWeek = () => {
    setCurrentWeekStartDate(nextSunday(currentWeekStartDate));
    setNextWeekStartDate(nextSunday(nextSunday(currentWeekStartDate)));
  }

  return (
    <>
        <Grid container spacing={2}>
            <Grid item md={5}>
                <Typography variant="h4" align="left" sx={{ marginX: 1, marginY: 1 }}>
                  Goals <Chip color="info" variant="filled" size="medium" label={`Week of ${currentWeekStartDate.toLocaleString('default', { month: 'long' })} ${currentWeekStartDate.getDate()}, ${currentWeekStartDate.getFullYear()}`} />
                  <IconButton color="primary" component="label" onClick={viewLastWeek}><ChevronLeft></ChevronLeft></IconButton>
                  <IconButton color="primary" component="label" disabled={nextWeekStartDate >= new Date()} onClick={viewNextWeek}><ChevronRight></ChevronRight></IconButton>
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
