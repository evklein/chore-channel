import { collection, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface GoalProps {
    firestore: Firestore,
}

function Goals(props: GoalProps) {
  const [goals] = useCollectionData(query(
    collection(props.firestore, "goals"),
    orderBy("name"),
  ));

  return (
    <>

    </>
  );
}

export default Goals;
