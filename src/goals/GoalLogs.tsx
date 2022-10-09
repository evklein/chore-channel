import { DocumentData } from "firebase/firestore";
import { Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface GoalLogsProps {
    events: DocumentData[] | undefined,
}

function GoalLogs(props: GoalLogsProps) {

  const renderEventDate = (seconds: number) => {
    var eventDate = new Date(seconds * 1000);
    return `${eventDate.toLocaleString('default', { month: 'long' })} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;
  }

  if (!props.events || props.events.length === 0) {
    return (
      <Typography align="left" variant="h5" sx={{ marginX: 1, marginY: 1}}>No events logged this week.</Typography>
    );
  }

  return (
    <>
            <Typography align="left" variant="h5" sx={{ marginX: 1, marginY: 1}}>Log</Typography>
                <Grid container spacing={2}>
        <Divider variant="middle" />
        <Grid item xs={5}>
        <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Completed On</TableCell>
              <TableCell align="left">Event</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.events && props.events?.map((event, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {renderEventDate(event.completed_on.seconds)}
                </TableCell>
                <TableCell align="left">Completed event of type "{event.event_type}"</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Grid>
    </Grid>
    </>
  );
}

export default GoalLogs;
