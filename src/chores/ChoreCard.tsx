import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
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
          Last Completed: { last_completed.toLocaleString("en-US", {timeZone: "Etc/GMT+8"}) }
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={() => {
          updateLastCompleteTime().then(() => {});
        }}>
          Completed
        </Button>
        {/* { getTagForCard() } */}
      </CardActions>
    </Card>
  );
}

export default ChoreCard;
