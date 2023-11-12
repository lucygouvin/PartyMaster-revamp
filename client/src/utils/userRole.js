export default function getUserRole (hostID, rsvpList, currentUser){
    if (hostID === currentUser){
        console.log("you're the host")
        return {hostBool: true,
        rsvp:''}
    }
    if (rsvpList.length){
       console.log(rsvpList)
    const result = rsvpList.find(({userId})=> userId === currentUser)
    console.log(result.invite)
    return {hostBool: false,
    rsvp: result.invite}
    // return result.invite
    }
    
}