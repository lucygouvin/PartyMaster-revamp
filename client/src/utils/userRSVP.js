export default function getUserRsvp (rsvpList, currentUser){
    if (rsvpList.length){
       console.log(rsvpList)
    const result = rsvpList.find(({userId})=> userId === currentUser)
    console.log(result.invite)
    return result.invite 
    }
    
}