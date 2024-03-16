import { useMutation } from "@apollo/client";
import { SET_RSVP } from "../../utils/mutations";

export default function DashboardListItem({ events, user }) {
  const isHost = events.hostID._id === user._id;
  const { invite } = events.RSVP.filter(
    (event) => event.userId._id === user._id
  )[0];

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
      <h3>Quick RSVP:</h3>
      {invite==="Not Responded"? (<>
      <button value={"Yes"} onClick={(event)=>saveSetRSVP(event.target.value)}><img  className="rsvp-icon" src="/checkmark_icon.png"></img></button>
      <button value={"No"} onClick={(event)=>saveSetRSVP(event.target.value)}><img  className="rsvp-icon" src="/x_icon.svg"></img></button>
      <button value={"Maybe"} onClick={(event)=>saveSetRSVP(event.target.value)}><img  className="rsvp-icon" src="/question_icon.png"></img></button>
      </>):<>{invite}</>}</>}</div>
    </div>
  );
}
