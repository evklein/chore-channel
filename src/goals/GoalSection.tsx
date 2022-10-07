import { Fab, Grid, Typography } from "@mui/material";
import { doc, DocumentData, Firestore, setDoc } from "firebase/firestore";

interface GoalSectionProps {
  firestore: Firestore,
  goal: DocumentData,
  completions: number,
}

function GoalSection(props: GoalSectionProps) {
  const { name, required_completions } = props.goal;

  const clickGoal = async(type: string) => {
    var now = new Date();
    await setDoc(doc(props.firestore, "events", `workout-${now.getTime()}`), {
      event_type: type,
      completed_on: now,
    });
  }
  
  const buttons = [];
  for (var i = 0; i < required_completions; i++) {
    buttons.push(
      <Fab
        color={i < props.completions ? "success" : "primary"}
        sx={{ marginX: 1 }}
        size="large"
        onClick={() => {
            if (props.completions < required_completions) clickGoal(props.goal.name);
        }}
      >
        {i + 1}
      </Fab>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" align="left" sx={{ marginX: 1, marginY: 1 }}>{name}</Typography>
      </Grid>
      <Grid container justifyContent="flex-start">
        {buttons}
      </Grid>
    </>
  );
}

export default GoalSection;
