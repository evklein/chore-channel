import { Fab, Grid, Typography } from "@mui/material";
import { DocumentData, Firestore } from "firebase/firestore";

interface GoalSectionProps {
  goal: DocumentData,
}

function GoalSection(props: GoalSectionProps) {
  const { name, required_completions } = props.goal;
  
  const buttons = [];
  for (var i = 0; i < required_completions; i++) {
    buttons.push(<Fab color="primary" sx={{ marginX: 1 }}>{i + 1}</Fab>);
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" align="left" sx={{ marginX: 1 }}>{name}</Typography>
      </Grid>
      <Grid container justifyContent="flex-start">
        {buttons}
      </Grid>
    </>
  );
}

export default GoalSection;
