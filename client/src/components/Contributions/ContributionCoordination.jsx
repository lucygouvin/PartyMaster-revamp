import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_CONTRIBUTION,
  CLAIM_CONTRIBUTION,
  UPDATE_EVENT,
} from "../../utils/mutations";
import "../../styles/Contribution.css";

export default function Contribution({
  contributions,
  eventId,
  user,
  isEditable,
  hostBool,
  contribBool,
  setContribBool,
}) {
  const [contribution, setContrib] = useState("");
  const [addContribution, { contribError }] = useMutation(ADD_CONTRIBUTION);
  const [claimContribution, { claimError }] = useMutation(CLAIM_CONTRIBUTION);
  const [updateEvent, { updateError }] = useMutation(UPDATE_EVENT);
  const [checked, setChecked] = useState(contribBool);

  useEffect(() => {
    setChecked(contribBool);
  }, [contribBool]);

  const handleChange = () => {
    setChecked(!checked);
  };

  const saveContribution = () => {
    try {
      const { data } = addContribution({
        variables: {
          contribution: {
            item: contribution,
          },
          eventId: eventId,
        },
      });
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
    setContrib("");
  };

  const claimItem = (e) => {
    console.log(eventId)
    console.log(e.target.getAttribute("data-item-id"))
    try {
      const { data } = claimContribution({
        variables: {
          eventId: eventId,
          contribution: {
            _id: e.target.getAttribute("data-item-id"),
          },
        },
      });
    } catch (eventError) {
      console.error("Unable to update event", eventError);
    }
  };

  const saveBool = () => {
    console.log(checked);
    console.log(eventId);

    try {
      console.log("trying");
      const { data } = updateEvent({
        variables: {
          id: eventId,
          potluck: !checked,
        },
      });
    } catch (updateError) {
      console.error("Unable to update", updateError);
    }
  };

  return (
    <>
      {/* If potluck boolean is false, indicate to user */}
      {contribBool ? (
        <>
          {/* If potlucks are allowed, show the component */}
          <div className="title-bool-group">
            <h3>Can I bring anything?</h3>
            {hostBool && isEditable && (
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                onClick={saveBool}
              />
            )}
          </div>
          {/* If contributions are allowed and there are some to show, list them */}
          {contributions &&
            contribBool &&
            contributions.map((contrib) => (
              <div
                className="post p-3 rounded bg-light border mb-3 contribution-item"
                key={contrib._id}
              >
                {contrib.item}{" "}
                {contrib.name ? (
                  <span className="muted-text">
                    {" "}
                    {`claimed by ${contrib.name}`}
                  </span>
                ) : (
                  <button data-item-id={contrib._id} onClick={claimItem}>
                    Claim
                  </button>
                )}
              </div>
            ))}
          {/* UI for adding contributions */}
          <div className="contrib-input-group">
            <input
              type="text"
              value={contribution}
              onChange={(event) => setContrib(event.target.value)}
              placeholder="I want to bring..."
              className="contrib-input"
            ></input>

            <button className="contribute-btn" onClick={saveContribution}>Add</button>
          </div>
        </>
      ) : (
        // Show below if potluck boolean is false
        <>
          <div className="title-bool-group">
            <h3>Host has disabled contributions for this event</h3>

            {hostBool && isEditable && (
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                onClick={saveBool}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
