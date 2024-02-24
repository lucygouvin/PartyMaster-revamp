import {useContext} from 'react';
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT} from "../../utils/mutations";

export default function Details ({details}){
    const {eventId} = useContext(EventContext);
    const {isHost} = useContext(EventContext);


    const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);

    const saveEventDetails = () => {
        try {
            const {data} = updateEvent({
                variables: {
                    id: eventId,
                    description: "Snowy and sleepy"
                }
            })
        }
        catch (eventError) {
            console.error("Unable to update event", eventError);
          }
      }

    return(
        <div className="group details-group">
            <h2>Details</h2>
            <p className="container details-container">{details}</p>
            {isHost ? (
            <button onClick={saveEventDetails}>Edit</button>
            ): <></>}
        </div>
    )
}