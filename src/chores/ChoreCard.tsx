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
  const { name, last_completed, period } = props.choreData;

  const updateLastCompleteTime = async() => {
    await updateDoc(doc(firestore, "chores", name), {
      last_completed: serverTimestamp(),
    });
  }

  const getLastCompletedDate = () => {
    if (last_completed) {
        var lastCompletedMs = last_completed.seconds * 1000;
        return new Date(lastCompletedMs);
    }

    return new Date();
  }

  const getPeriodString = () => {
    switch (period) {
        case "1":
            return "Daily";
        case "7":
            return "Weekly";
        case "14":
            return "Biweekly"
        case "30":
            return "Monthly";
        default:
            return "Unknown Period";
    }
  }

  const getStatusTag = () => {
    var now = new Date();
    var lastCompletedDate = getLastCompletedDate();
    
    var monthDate = now.getDay();

    if (now.getDay() === lastCompletedDate.getDay() + 1 || (
        lastCompletedDate.getDay() === 28 || lastCompletedDate.getDay() === 30 || lastCompletedDate.getDay() === 31  &&
        now.getDay() === 1))
    {
        return <Chip label="Do Today" color="warning" sx={{ ml: 1 }} />;
    }
    if (now.getDay() >= lastCompletedDate.getDay() + 2 || (
        lastCompletedDate.getDay() === 28 || lastCompletedDate.getDay() === 30 || lastCompletedDate.getDay() === 31  &&
        now.getDay() >= 2))
    {
        return <Chip label="Overdue" color="error" sx={{ ml: 1 }} />;
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
