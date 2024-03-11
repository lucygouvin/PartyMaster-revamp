import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";

import GuestDetailsModal from "../Modals/GuestDetails";
import ConfirmDeleteModal from "../Modals/ConfirmDelete";
import EditAddModal from "../Modals/EditAddModal";

import "../../styles/Guests.css";

export default function Guests({ guests }) {
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  // State management for guest details modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// State management for tracking which users to invite
  const [invitee, setInvitee] = useState("");

  // State management for invitation modal
  const [inviteOpen, setInviteOpen] = useState(false);
  const handleInviteOpen = () => setInviteOpen(true);
  const handleInviteClose = () => {
    setInviteOpen(false);
    setInvitee("");
  };

  // State management for tracking which user to delete
  const [delId, setDelId] = useState("");

  // State management for delete modal
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = (delId) => {
    setDelOpen(true);
    setDelId(delId);
  };
  const handleDelClose = () => setDelOpen(false);

  // MUTATIONS
  const [addGuest, { addGuestError }] = useMutation(ADD_GUEST);
  const saveAddGuest = (guestEmail) => {
    try {
      const { data } = addGuest({
        variables: {
          eventId,
          guests: guestEmail,
        },
      });
    } catch (addGuestError) {
      console.error("Unable to add guest", addGuestError);
    }
    setInvitee("");
    handleInviteClose();
  };

  const [deleteGuest, { deleteGuestError }] = useMutation(DELETE_GUEST);
  const saveDeleteGuest = (guestId) => {
    console.log("delID", delId);
    try {
      const { data } = deleteGuest({
        variables: {
          eventId,
          guestId: delId,
        },
      });
      setDelId("");
    } catch (deleteGuestError) {
      console.error("Unable to delete guest", deleteGuestError);
    }
    handleDelClose();
  };

  const [setRSVP, { RSVPerror }] = useMutation(SET_RSVP);
  const saveSetRSVP = () => {
    try {
      const { data } = setRSVP({
        variables: {
          eventId,
          rsvp: "No",
        },
      });
    } catch (RSVPerror) {
      console.error("Unable to save RSVP", RSVPerror);
    }
  };
  return (
    <div className="group guests-group">
      <div className="flex-group">
        <h2>Guests</h2>
        <a href="#">
          {" "}
          <p className="see-all" onClick={handleOpen}>See all</p>
        </a>
      </div>
      <div className="container guest-container">
        <div className="response-numbers">
          <h3>Yes: {guests.rsvpYes.length} </h3>
          <h3>No: {guests.rsvpNo.length} </h3>
          <h3>Maybe: {guests.rsvpMaybe.length} </h3>
          {/* <h3>Not Responded: {guests.rsvpNotResponded.length}</h3> */}
        </div>
        {/* If the current user is the event host, they can add more guests */}
        {isHost ? (
          <>
            <button
              className="button cta-button edit-guests"
              onClick={handleOpen}
            >
              Edit Guests
            </button>
          </>
        ) : (
          <button onClick={saveSetRSVP}>Set RSVP</button>
        )}
      </div>
      <GuestDetailsModal
        setDel={(event) => handleDelOpen(event.target.value)}
        guests={guests}
        isActive={open}
        onClose={handleClose}
        onDelete={handleDelOpen}
        onAction={handleInviteOpen}
      ></GuestDetailsModal>
      <ConfirmDeleteModal
        isActive={delOpen}
        title={"Are you sure you want to remove this guest?"}
        onClose={handleDelClose}
        onDelete={saveDeleteGuest}
      ></ConfirmDeleteModal>
      <EditAddModal
        isActive={inviteOpen}
        inputType={"textarea"}
        placeholder={"Enter email addresses separated by commas"}
        value={invitee}
        onChange={(event) => setInvitee(event.target.value)}
        title={"Invite guests"}
        onClose={handleInviteClose}
        onSave={(event) => {
          const inviteeArray = invitee.split(",");
          inviteeArray.forEach((el) => saveAddGuest(el));
        }}
      ></EditAddModal>
    </div>
  );
}
