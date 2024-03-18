import { useMutation } from "@apollo/client";
import { SET_RSVP } from "../../utils/mutations";

export default function DashboardListItem({ events, user }) {
  const isHost = events.hostID._id === user._id;

  let invite;

  if(!isHost){
   invite=events.RSVP.filter(
    (event) => event.userId._id === user._id
  )[0].invite}

  const [setRSVP, { RSVPerror }] = useMutation(SET_RSVP);
  const saveSetRSVP = (value) => {
    try {
      const { data } = setRSVP({
        variables: {
          eventId:events._id,
          rsvp: value,
        },
      });
    } catch (RSVPerror) {
      console.error("Unable to save RSVP", RSVPerror);
    }
  };

  return (
    <div className="event-list__item">
      <div className="event-info">
        <a href={`/event/${events._id}`}>
          <p>
            <span className="title-text"> {events.title} </span>{" "}
            <span className="muted-text">hosted by {events.hostID.name}</span>
          </p>
        </a>
        <p>
          {events.date} at {events.startTime} in {events.location}
        </p>
      </div>
      <div>{isHost ? <p>You're the Host!</p> : <>
      <h3>RSVP:</h3>
      {invite==="Not Responded"? (<>
      <button value={"Yes"} onClick={(event)=>saveSetRSVP(event.target.value)}>&#10003;</button>
      <button value={"No"} onClick={(event)=>saveSetRSVP(event.target.value)}>&#88;</button>
      <button value={"Maybe"} onClick={(event)=>saveSetRSVP(event.target.value)}>&#63;</button>
      </>):<>{invite}</>}</>}</div>
    </div>
  );
}
