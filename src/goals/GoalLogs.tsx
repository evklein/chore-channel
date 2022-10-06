import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface GoalLogsProps {
    firestore: Firestore,
}

function GoalSection(props: GoalLogsProps) {
  const [events] = useCollectionData(query(
    collection(props.firestore, "events"),
    orderBy("completed_on"),
  ));

  return (
    <>

    </>
  );
}

export default GoalSection;
