import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_RSVP } from "../../utils/mutations"
import EasyEdit from 'react-easy-edit';

export default function RSVP ({userResponse, rsvpYes, rsvpNo, rsvpMaybe, eventId, user}) {
    const [isEditable, setIsEditable] = useState(false)
    const [updateRSVP, {rsvpError}] = useMutation(UPDATE_RSVP)
    let [guestRSVP, setGuestRSVP] = useState(userResponse.rsvp)



    const toggleEditable = () => {
        setIsEditable(!isEditable)
      }

    const saveRSVP=(value) =>{
    setGuestRSVP(value)
    toggleEditable()
    try {
        const {data} = updateRSVP({
        variables: {
            id: eventId,
            rsvp: {
            userId: user.data._id,
            invite: value
            }
        }
        })
        }catch(rsvpError){
            console.error('Unable to update RSVP', rsvpError)
    
        } 
    }

    return(
        <>
        {userResponse.hostBool===true?(
        <>
            <p>You're not a guest</p>
            <h3>RSVPs</h3>
            <p>Yes: {rsvpYes.length}</p>
            <p>No: {rsvpNo.length}</p>
            <p>Maybe: {rsvpMaybe.length}</p>
        </>

        ):(
        <>
            <p>You're a guest</p>
            <h3>Your RSVP:{guestRSVP}</h3>
            <button onClick={toggleEditable} hidden={isEditable}>Change RSVP</button>
            <EasyEdit
                type="select"
                options={[
                    {label: "Yes", value: 'Yes'},
                    {label: 'No', value: 'No'},
                    {label: 'Maybe', value: 'Maybe'}]}
                allowEdit={isEditable}
                placeholder={userResponse.rsvp}
                onSave={saveRSVP}
            />
            <p>{rsvpYes.length} Going</p>
            <p>{rsvpNo.length} Not going</p>
            <p>{rsvpMaybe.length} Maybe going</p>
        </>

        )}
        </>


    )

}