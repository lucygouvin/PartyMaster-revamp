import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIB } from "../../utils/mutations";

import Contribution from "./Contribution";

export default function ContributionSection({ contributionArray }) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  const claimantId = isHost ? "" : user._id;

  const [contrib, setContrib] = useState("");

  // MUTATIONS
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
      <h2>Can I Bring Anything?</h2>
      <div className="container contribution-list">
        {contributionArray.map(function (contribInfo) {
          return (
            <Contribution contribution={contribInfo} key={contribInfo._id} />
          );
        })}
        <div className="add-contrib-section">
          <input className="add-contrib-item"
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
      </div>
    </div>
  );
}
