import { collection, DocumentData, Firestore, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface GoalLogsProps {
    events: DocumentData[] | undefined,
}

function GoalLogs(props: GoalLogsProps) {
  return (
    <>
        {props.events && props.events.length}
        {props.events && props.events?.map((event, i) => {
            return (
                <span key={i}>{event.completed_on.seconds}: Completed event of type "{event.event_type}"</span>
            );
        })}
    </>
  );
}

export default GoalLogs;
