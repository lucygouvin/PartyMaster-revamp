import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIBUTION, CLAIM_CONTRIBUTION } from "../../utils/mutations";

export default function Contribution({ contributions, eventId, user}) {
    const [contribution, setContrib] = useState('')
    const [addContribution, {contribError}] = useMutation(ADD_CONTRIBUTION)
    const [claimContribution, {claimError}] = useMutation(CLAIM_CONTRIBUTION)

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
    
    const claimItem = (e) => {
        console.log(e.target)
        try {
            const {data} = claimContribution({
              variables:{
                eventId: eventId,
                contribution: {
                  _id: e.target.getAttribute("data-item-id")
                }
              }
            })
          }catch (eventError) {
            console.error('Unable to update event', eventError)
          }

    }
    
  return (
    <>
    {contributions &&
          contributions.map((contrib) => (
          <div className="post p-3 rounded bg-light border mb-3 " key={contrib._id}>
        <p>{contrib.item} </p> {contrib.name ?(
        `claimed by ${contrib.name}`

        ) : (
        <button data-item-id={contrib._id} onClick={claimItem}>Claim</button>)}
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
