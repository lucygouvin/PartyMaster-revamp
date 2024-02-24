import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import {
  CLAIM_CONTRIB,
  EDIT_CONTRIB,
  DELETE_CONTRIB,
  UNCLAIM_CONTRIB,
} from "../../utils/mutations";

export default function Contribution({ contribution }) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);
  const {isHost} = useContext(EventContext);
  let ownerId;
  let isUnowned;
  if (contribution.userId){
    ownerId = ownerId = contribution.userId._id
    isUnowned = false
  }else{
    ownerId = ""
    isUnowned = true
  }

  const isOwner = (user._id === ownerId);

  const [editContrib, { editContribError }] = useMutation(EDIT_CONTRIB);
  const [claimContrib, { claimContribError }] = useMutation(CLAIM_CONTRIB);
  const [deleteContrib, { deleteContribError }] = useMutation(DELETE_CONTRIB);
  const [unclaimContrib, { unclaimContribError }] =
    useMutation(UNCLAIM_CONTRIB);

  const saveEditContrib = () => {
    try {
      const { data } = editContrib({
        variables: {
          eventId,
          item: "dip from child",
          contributionId: "65c7a73eb0c018697d0eca6a",
        },
      });
    } catch (editContribError) {
      console.error("Unable to edit contribution", editContribError);
    }
  };

  const saveClaimContrib = () => {
    try {
      const { data } = claimContrib({
        variables: {
          eventId,
          contributionId: "65c7a73eb0c018697d0eca6a",
        },
      });
    } catch (claimContribError) {
      console.error("Unable to edit contribution", claimContribError);
    }
  };

  const saveDeleteContrib = () => {
    try {
      const { data } = deleteContrib({
        variables: {
          eventId,
          contributionId: "65c7a73eb0c018697d0eca6a",
        },
      });
    } catch (deleteContribError) {
      console.error("Unable to delete contribution", deleteContribError);
    }
  };

  const saveUnclaimContrib = () => {
    try {
      const { data } = unclaimContrib({
        variables: {
          eventId,
          contributionId: "65c7a73eb0c018697d0eca6a",
        },
      });
    } catch (unClaimContribError) {
      console.error("Unable to edit contribution", unClaimContribError);
    }
  };

  return (
    <div className="contribution-item">
      <p>
        {contribution.userId ? contribution.userId.name : "Unclaimed"},{" "}
        {contribution.item}
      </p>
      {isOwner ? (
        <>
         <button onClick={saveEditContrib}>Edit</button>
         <button onClick={saveUnclaimContrib}>Unclaim</button>
        </>
      ) : (
        <></>
      )}
      {isOwner|| isHost ? (
        <>
          <button onClick={saveDeleteContrib}>Delete</button>
        </>
      ) : (
        <></>
      )}
      {isUnowned ? (
        <>
        <button onClick={saveClaimContrib}>Claim</button>
        </>
      ) : (
        <></>
      )}
      
      
      
      
    </div>
  );
}
