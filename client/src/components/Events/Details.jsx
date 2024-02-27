import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT } from "../../utils/mutations";

import '../../styles/Details.css'

export default function Details({ details }) {
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);

  const saveEventDetails = () => {
    try {
      const { data } = updateEvent({
        variables: {
          id: eventId,
          description: "Join us for an evening under the stars right inside our warm and cozy winery! Our winemaker Kevin Collins is also an amateur astronomer and telescope maker. Using a planetarium projector he will take us on a journey across the night sky, star-hopping through constellations to show and tell about some of our universe's most beautiful sights. Included in this season's shows will be a short talk on the upcoming Total Solar Eclipse in April 2024! Learn about why total eclipses happen, when, and where to view the first in decades that will be within a few hour's drive of western Massachusetts.",
        },
      });
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  return (
    <div className="group details-group">
      <div className="flex-group">
        <h2>Details</h2>
        {isHost ? <button className="edit-button" onClick={saveEventDetails}>Edit</button> : <></>}
      </div>
      <p className="container details-container">{details}</p>
    </div>
  );
}
