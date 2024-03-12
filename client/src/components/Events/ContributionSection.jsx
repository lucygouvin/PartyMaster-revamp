import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIB, EDIT_EVENT } from "../../utils/mutations";

import Contribution from "./Contribution";
import Switch from "@mui/material/Switch";

export default function ContributionSection({
  contributionArray,
  contributionBool,
}) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  const claimantId = isHost ? "" : user._id;

  // State management for adding contributions
  const [contrib, setContrib] = useState("");

  // State management for turning contributions on and off
  const [checked, setChecked] = useState(contributionBool);

  // MUTATIONS
  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);
  const saveEventDetails = (checked) => {
    setChecked(checked);
    try {
      const { data } = updateEvent({
        variables: {
          id: eventId,
          potluck: checked,
        },
      });
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  const [addContrib, { addContribError }] = useMutation(ADD_CONTRIB);
  const saveAddContrib = () => {
    try {
      const { data } = addContrib({
        variables: {
          eventId,
          contribution: contrib,
          userId: claimantId,
        },
      });
      setContrib("");
    } catch (addContribError) {
      console.error("Unable to add contribution", addContribError);
    }
  };

  return (
    <div className="group contribution-group">
      <div className="flex-group">
        <h2>Can I Bring Anything?</h2>
        {/* If the logged in user is the host, show the switch to toggle contributions */}
        {isHost ? (
          <Switch
            checked={checked}
            onChange={(event) => saveEventDetails(event.target.checked)}
          ></Switch>
        ) : (
          <></>
        )}
      </div>
      <div className="container contribution-list">
        {/* If potluck is turned on, show the contributions */}
        {checked? (
          <>
          {contributionArray.map(function (contribInfo) {
          return (
            <Contribution contribution={contribInfo} key={contribInfo._id} />
          );
        })}
        <div className="add-contrib-section">
          <input
            className="add-contrib-item"
            type="text"
            onChange={(event) => setContrib(event.target.value)}
            value={contrib}
          />
          <button
            className="button add-contrib cta-button"
            onClick={saveAddContrib}
          >
            Add
          </button>
        </div>
        </>
        ):(
          // If potluck is turned off, inform the user
        <><p>The host turned off contributions for this event.</p></>)}
      </div>
    </div>
  );
}
