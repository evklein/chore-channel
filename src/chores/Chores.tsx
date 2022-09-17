import { Grid } from "@mui/material";
import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface ChoresProps {
    firestore: Firestore,
}

function Chores(props: ChoresProps) {
  const [chores] = useCollectionData(query(
    collection(props.firestore, 'chores'),
    orderBy('name'),
  ));

  return (
    <Grid container spacing={0}>
    {chores && chores.map(c => (
      <Grid item xs={12} sm={6} md={3}>
        <ChoreCard key={c.id} chore={c} />
      </Grid>
    ))}
    </Grid>
  );
}

export default Chores;
