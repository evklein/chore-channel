import { DocumentData } from "firebase/firestore";

interface GoalLogsProps {
    events: DocumentData[] | undefined,
}

function GoalLogs(props: GoalLogsProps) {

  const renderEventDate = (seconds: number) => {
    var eventDate = new Date(seconds * 1000);
    return `${eventDate.toLocaleString('default', { month: 'long' })} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;
  }
  return (
    <>
        {props.events && props.events?.map((event, i) => {
            return (
                <span key={i}>{renderEventDate(event.completed_on.seconds)}: Completed event of type "{event.event_type}"</span>
            );
        })}
    </>
  );
}

export default GoalLogs;
