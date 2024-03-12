import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT } from "../../utils/mutations";

import "../../styles/Details.css";

export default function Details({ details }) {
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  // State management of edit mode
  const [editBool, toggleEdit] = useState(false);
  const toggleOff = () => toggleEdit(false);
  const toggleOn = () => toggleEdit(true);

  // State management for description editing
  const [description, setDescription] = useState(details);

  // MUTATION
  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);
  const saveEventDetails = () => {
    try {
      const { data } = updateEvent({
        variables: {
          id: eventId,
          description,
        },
      });
      toggleOff();
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  return (
    <div className="group details-group">
      <div className="flex-group">
        <h2>Details</h2>
        {/* Show edit button if the logged in user is the host, and it's not in edit mode */}
        {isHost && !editBool ? (
          <button className="edit-button" onClick={toggleOn}>
            Edit
          </button>
        ) : (
          <></>
        )}
        {/* Show the save and cancel buttons if the logged in user is the host, and it's in edit mode */}
        {isHost && editBool ? (
          <div className="flex-group">
            <button className="button cta-button" onClick={saveEventDetails}>
              Save
            </button>
            <button className="button cancel-button" onClick={toggleOff}>
              Cancel
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* If it's in edit mode, show the textarea field */}
      {editBool ? (
        <div className="container details-container">
          <textarea
            rows="5"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      ) : (
        // If it's not in edit mode, show the display field
        <p className="container details-container">{description}</p>
      )}
    </div>
  );
}
