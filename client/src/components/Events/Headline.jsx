import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT } from "../../utils/mutations";

import "../../styles/Headline.css";

export default function Headline({ headline }) {
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  // State management of edit mode
  const [editBool, toggleEdit] = useState(false);
  const toggleOff = () => toggleEdit(false);
  const toggleOn = () => toggleEdit(true);

  // State management of editable fields
  const [date, setDate] = useState(headline.date);
  const [startTime, setStartTime] = useState(headline.startTime);
  const [endTime, setEndTime] = useState(headline.endTime);
  const [title, setTitle] = useState(headline.title);
  const [location, setLocation] = useState(headline.location);

  // MUTATION
  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);
  const saveEventDetails = () => {
    try {
      const { data } = updateEvent({
        variables: {
          id: eventId,
          title,
          date,
          startTime,
          endTime,
          location,
        },
      });
      toggleOff();
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  return (
    <div className="headline">
      {/* If in edit mode, show input fields */}
      {editBool ? (
        <div className="edit-mode">
          <div className="event-info">
            <div className="event-date-time">
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              ></input>{" "}
              <p> from</p>{" "}
              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              ></input>{" "}
              <p>to</p>{" "}
              <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              ></input>
            </div>
            <input
              className="edit-event-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <h3 className="event-host">Hosted by {headline.hostName}</h3>
            <input
              className="event-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            ></input>
          </div>
          <div className="flex-group">
          <button
            className="button cta-button headline-edit-button"
            onClick={saveEventDetails}
          >
            Save
          </button>
          <button
            className="button cancel-button headline-edit-button"
            onClick={toggleOff}
          >
            Cancel
          </button>
          </div>
        </div>
      ) : (
        // If not in edit mode, show display fields
        <div className="view-mode">
          <div className="event-info">
            <h2 className="event-date-time">
              {date} from {startTime} to {endTime}
            </h2>
            <h1 className="event-title">{title}</h1>
            <h3 className="event-host">Hosted by {headline.hostName}</h3>
            <h3 className="event-location">{location}</h3>
          </div>
          {/* Only show the edit button if the logged in user is the host */}
          {isHost ? (
            <button
              className="button edit-button headline-edit-button"
              onClick={toggleOn}
            >
              Edit
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
