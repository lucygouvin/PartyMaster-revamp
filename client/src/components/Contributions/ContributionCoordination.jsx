import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIBUTION } from "../../utils/mutations";

export default function Contribution({ contributions,eventId }) {
    const [contribution, setContrib] = useState('')
    const [addContribution, {contribError}] = useMutation(ADD_CONTRIBUTION)

    const saveContribution = () => {
        try {
          const {data} = addContribution({
            variables: {
              contribution: {
                item: contribution
              },      
              eventId: eventId
            }
          })
        }catch (eventError) {
          console.error('Unable to update event', eventError)
        }
      setContrib('')
      }
    
  return (
    <>
    {contributions &&
          contributions.map((contrib) => (
          <div className="post p-3 rounded bg-light border mb-3 " key={contrib._id}>
        <p>{contrib.item} claimed by {contrib.name}</p>
      </div>
       ))}
      <input
        type="text"
        value={contribution}
        onChange={(event) => setContrib(event.target.value)}
      ></input>
         
      
      <button onClick={saveContribution}>Add</button>
    </>
  );
}
