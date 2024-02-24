import { useMutation } from "@apollo/client";
import {useContext} from 'react';
import { EventContext } from "./EventContext";
import { SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";

export default function Guests({ guests}) {
    const [setRSVP, { RSVPerror }] = useMutation(SET_RSVP);
    const [addGuest, { addGuestError }] = useMutation(ADD_GUEST);
    const [deleteGuest, { deleteGuestError }] = useMutation(DELETE_GUEST);
    const eventId = useContext(EventContext)
    const saveAddGuest = () => {
      try {
        const { data } = addGuest({
          variables: {
            eventId,
            guests: "RonHensom@gmail.com",
          },
        });
      } catch (addGuestError) {
        console.error("Unable to add guest", addGuestError);
      }
    };
    
    const saveDeleteGuest = () => {
      try {
        const { data } = deleteGuest({
          variables: {
            eventId,
            guestEmail: "RonHensom@gmail.com",
          },
        });
      } catch (deleteGuestError) {
        console.error("Unable to delete guest", deleteGuestError);
      }
    };
    
    const saveSetRSVP = () => {
      try {
        const { data } = setRSVP({
          variables: {
            eventId,
            rsvp: "Maybe",
          },
        });
      } catch (RSVPerror) {
        console.error("Unable to save RSVP", RSVPerror);
      }
    };
  return (
    <div className="group guests-group">
      <h2>Guests</h2>
      <p>See all</p>
      <div className="container guest-container">
        <h3>Yes: {guests.rsvpYes.length} </h3>
        <h3>No: {guests.rsvpNo.length} </h3>
        <h3>Maybe: {guests.rsvpMaybe.length} </h3>
        <h3>Not Responded: {guests.rsvpNotResponded.length}</h3>
        <button onClick={saveAddGuest}>Add Guest</button>
        <button onClick={saveDeleteGuest}>Delete Guest</button>
        <button onClick={saveSetRSVP}>Set RSVP</button>
      </div>
    </div>
  );
}
