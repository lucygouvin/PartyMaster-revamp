import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import {
  CLAIM_CONTRIB,
  EDIT_CONTRIB,
  DELETE_CONTRIB,
  UNCLAIM_CONTRIB,
} from "../../utils/mutations";

import EditContribModal from "../Modals/EditContrib";

import '../../styles/Contribution.css'

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

  // State management for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State management of edit mode
  const [editBool, toggleEdit] = useState(false);
  const toggleOff = () => toggleEdit(false);
  const toggleOn = () => toggleEdit(true);

  // State management for contribution text and editing that text
  const [contribText, setContribText] = useState(contribution.item)
  const [editContribText, setEditContribText] = useState(contribText)

  // MUTATIONS
  const [editContrib, { editContribError }] = useMutation(EDIT_CONTRIB);
  const saveEditContrib = () => {
    try {
      const { data } = editContrib({
        variables: {
          eventId,
          item: editContribText,
          contributionId: contribution._id,
        },
      });
      toggleOff()
      handleClose()
    } catch (editContribError) {
      console.error("Unable to edit contribution", editContribError);
    }
  };

  const [claimContrib, { claimContribError }] = useMutation(CLAIM_CONTRIB);
  const saveClaimContrib = () => {
    try {
      const { data } = claimContrib({
        variables: {
          eventId,
          contributionId: contribution._id,
        },
      });
    } catch (claimContribError) {
      console.error("Unable to edit contribution", claimContribError);
    }
  };

  const [deleteContrib, { deleteContribError }] = useMutation(DELETE_CONTRIB);
  const saveDeleteContrib = () => {
    try {
      const { data } = deleteContrib({
        variables: {
          eventId,
          contributionId: contribution._id,
        },
      });
    } catch (deleteContribError) {
      console.error("Unable to delete contribution", deleteContribError);
    }
  };

  const [unclaimContrib, { unclaimContribError }] =
    useMutation(UNCLAIM_CONTRIB);
  const saveUnclaimContrib = () => {
    try {
      const { data } = unclaimContrib({
        variables: {
          eventId,
          contributionId: contribution._id,
        },
      });
      handleClose()
    } catch (unClaimContribError) {
      console.error("Unable to edit contribution", unClaimContribError);
    }
  };

  return (
    <div className="contribution-item">
      <p>
        {contribution.item}
      </p>
      <div className="contribution-button-group">
      {isUnowned ? (
        <>
        <button onClick={saveClaimContrib} className="cta-button">Claim</button>
        </>
      ) : (
        <><i>{contribution.userId ? contribution.userId.name : contribution.userId.email}</i></>
      )}
     
      {isOwner|| isHost ? (
        <>
          <button onClick={handleOpen} className="edit-button">Edit</button>
        </>
      ) : (
        <></>
      )}
      <EditContribModal isActive={open} isOwner={isOwner} editBool={editBool} toggleOff={toggleOff} toggleOn={toggleOn} value={editContribText} onChange={(event) => setEditContribText(event.target.value)} onClose={handleClose} onSave={saveEditContrib} onDelete={saveDeleteContrib} onUnclaim={saveUnclaimContrib}></EditContribModal>      
      </div>
    </div>
  );
}
