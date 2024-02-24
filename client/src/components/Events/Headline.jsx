import {useContext} from 'react';
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_EVENT} from "../../utils/mutations";

export default function Headline({headline}){
    const {eventId} = useContext(EventContext);
    const {isHost} = useContext(EventContext);

    const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);

    const saveEventDetails = () => {
        try {
            const {data} = updateEvent({
                variables: {
                    id: eventId,
                    title: "Edit from child"
                }
            })
        }
        catch (eventError) {
            console.error("Unable to update event", eventError);
          }
      }

    return(
        <div className="headline">
            <div className="event-info">
            <h3>{headline.date} from {headline.startTime} to {headline.endTime}</h3>
            <h2>{headline.title}</h2>
            <h4>Hosted by {headline.hostName}</h4>
            <h4>{headline.location}</h4>
            </div>
            {isHost ? (
            <button onClick={saveEventDetails}>Edit</button>
            ): <></>}


        </div>
    )
}