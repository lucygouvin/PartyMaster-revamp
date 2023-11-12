import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIBUTION, CLAIM_CONTRIBUTION } from "../../utils/mutations";
import '../../styles/Contribution.css'

export default function Contribution({ contributions, eventId, user }) {
  const [contribution, setContrib] = useState("");
  const [addContribution, { contribError }] = useMutation(ADD_CONTRIBUTION);
  const [claimContribution, { claimError }] = useMutation(CLAIM_CONTRIBUTION);

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

  return (
    <>
    <h3>Can I bring anything?</h3>
      {contributions &&
        contributions.map((contrib) => (
          <div
            className="post p-3 rounded bg-light border mb-3 contribution-item"
            key={contrib._id}
          >
            {contrib.item}{" "}
            
          {contrib.name ? (
               <span className="muted-text"> {`claimed by ${contrib.name}`}</span>
            ) : (
              <button data-item-id={contrib._id} onClick={claimItem}>
                Claim
              </button>
            )}
          </div>
        ))}
    <div className="contrib-input-group">
      <input
        type="text"
        value={contribution}
        onChange={(event) => setContrib(event.target.value)}
        placeholder="I want to bring..."
        className="contrib-input"
        
      ></input>

      <button onClick={saveContribution} >Add</button>
      </div>
    </>
  );
}
