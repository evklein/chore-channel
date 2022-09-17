import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { DocumentData, Firestore, serverTimestamp } from 'firebase/firestore';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

interface ChoreCardProps {
    choreData: DocumentData,
    db: Firestore,
}

function ChoreCard(props: ChoreCardProps) {
    const { db } = props;
    const { name, last_completed, period } = props.choreData;
    let lastCompletedDate = new Date(1970, 0, 1);
    lastCompletedDate.setSeconds(last_completed["seconds"]);
    
    let now = Date.now() / 1000;
  
    const updateLastCompleteTime = async() => {
      db.collection('chores').doc(name).update({ last_completed: serverTimestamp() });
    }

    const getTagForCard = () => {
        var status = "";
        if (period === "Daily") {
          if (now - last_completed["seconds"] > 60 * 60 * 12) {
            status = "Due Today";
      
            if (now - last_completed["seconds"] > 60 * 60 * 24) {
              status = "Overdue";
            }
          }
        }
        if (period === "Weekly") {
          if (now - last_completed["seconds"] > 60 * 60 * 24 * 7) {
            status = "Due Today";
      
            if (now - last_completed["seconds"] > 60 * 60 * 24 * 9) {
              status = "Overdue";
            }
          }
        }
        if (period === "Monthly") {
          if (now - last_completed["seconds"] > 60 * 60 * 24 * 29) {
            status = "Due Today";
      
            if (now - last_completed["seconds"] > 60 * 60 * 24 * 31) {
              status = "Overdue";
            }
          }
        }
      
        var tag;
        if (status === "Overdue") {
          tag = <Chip label="Overdue" color="error" sx={{ ml: 1 }} />;
        }
        if (status === "Due Today") {
          tag = <Chip label="Due Today" color="warning" sx={{ ml: 1 }} />;
        }

        return tag;
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
            Last Completed: { lastCompletedDate.toLocaleString('en-US', {timeZone: "Etc/GMT+8"}) }
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" onClick={() => {
            updateLastCompleteTime().then(() => {});
          }}>
            Completed
          </Button>
          { getTagForCard() }
        </CardActions>
      </Card>
    );
  }

export default ChoreCard;
