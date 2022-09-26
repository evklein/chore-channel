import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { doc, DocumentData, Firestore, serverTimestamp, updateDoc } from "firebase/firestore";

import "firebase/compat/firestore";
import "firebase/compat/auth";

interface ChoreCardProps {
  choreData: DocumentData,
  firestore: Firestore,
}

function ChoreCard(props: ChoreCardProps) {
  const { firestore } = props;
  const { name, last_completed, period, tolerance } = props.choreData;

  const updateLastCompleteTime = async() => {
    await updateDoc(doc(firestore, "chores", name), {
      last_completed: serverTimestamp(),
    });
  }

  const getLastCompletedDate = () => {
    if (last_completed) {
      var lastCompletedMs = last_completed.seconds * 1000;
      var lastCompletedDate = new Date(lastCompletedMs);
      return new Date(lastCompletedDate.getFullYear(), lastCompletedDate.getMonth(), lastCompletedDate.getDate());
    }

    return new Date();
  }

  const getDifferenceInDaysSinceTaskCompleted = () => {
    var now = new Date();
    var nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var lastCompletedDate = getLastCompletedDate();
    return (nowStart.getTime() - lastCompletedDate.getTime()) / (1000 * 3600 * 24);
  }

  const getPeriodString = () => {
    var daysOfDifference = getDifferenceInDaysSinceTaskCompleted();
    if (period === 1) return "Daily";
    else if (daysOfDifference < period) {
      var remainingDays = period - daysOfDifference;
      return remainingDays + (remainingDays > 1 ? " days remaining" : " day remaining");
    }

    switch (period) {
      case 5:
      case 7:
        return "Weekly";
      case 14:
        return "Biweekly"
      case 30:
        return "Monthly";
      default:
        return "Unknown Period";
    }
  }

  const getStatusTag = () => {
    var daysOfDifference = getDifferenceInDaysSinceTaskCompleted();
    if (daysOfDifference >= period && daysOfDifference <= period + tolerance)
    {
        return <Chip label="Do Today" color="warning" sx={{ ml: 1 }} />;
    }
    else if (daysOfDifference > period + tolerance)
    {
        return <Chip label="Overdue" color="error" sx={{ ml: 1 }} />;
    }
    else if (period !== 1 && (period - daysOfDifference <= 3))
    {
      return <Chip label={`Upcoming (${period - daysOfDifference})`} color="info" sx={{ ml: 1}} />;
    }
    return <Chip label="Not Due" color="success" sx={{ ml: 1 }} />;
  }
    
  return (
    <Card sx={{ maxWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          { getPeriodString() }
        </Typography>
        <Typography variant="body2">
          Last Completed: { getLastCompletedDate().toLocaleDateString("en-US") }
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => {
          updateLastCompleteTime().then(() => {});
        }}>
          Completed
        </Button>
        {getStatusTag()}
      </CardActions>
    </Card>
  );
}

export default ChoreCard;
