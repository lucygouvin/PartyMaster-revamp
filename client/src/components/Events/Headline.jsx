import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT } from "../../utils/mutations";

import "../../styles/Headline.css";

export default function Headline({ headline }) {
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);

  const saveEventDetails = () => {
    try {
      const { data } = updateEvent({
        variables: {
          id: eventId,
          title: "Test event title",
        },
      });
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  return (
    <div className="headline">
      <div className="event-info">
        <h2 className="event-date-time">
          {headline.date} from {headline.startTime} to {headline.endTime}
        </h2>
        <h1 className="event-title">{headline.title}</h1>
        <h3 className="event-host">Hosted by {headline.hostName}</h3>
        <h3 className="event-location">{headline.location}</h3>
      </div>
      {isHost ? <button className="button edit-button headline-edit-button" onClick={saveEventDetails}>Edit</button> : <></>}
    </div>
  );
}
