import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIB } from "../../utils/mutations";

import Contribution from "./Contribution";

export default function ContributionSection({ contributionArray }) {
    const {eventId} = useContext(EventContext)

    const [addContrib, {addContribError}] = useMutation(ADD_CONTRIB)

    const saveAddContrib = () => {
        try {
          const {data} = addContrib ({
            variables: {
            eventId,
            contribution: "test from child component again",
            userId: "659342c99429127b5e676c82"
          }
          })
        }catch(addContribError) {
          console.error("Unable to add contribution", addContribError)
        }
      }

    return (
    <div className="group contribution-group">
      <h2>Can I Bring Anything?</h2>
      <div className="container contribution-list">
        {contributionArray.map(function (contribInfo) {
          return <Contribution contribution={contribInfo} key={contribInfo._id}/>;
        })}
      
      <textarea></textarea>
      <button onClick={saveAddContrib}>Add</button>
      </div>
    </div>
  );
}
