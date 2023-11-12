export default function getUserRole (hostID, rsvpList, currentUser){
    if (hostID === currentUser){
        return {hostBool: true,
        rsvp:''}
    }
    if (rsvpList.length){
        const result = rsvpList.find(({userId})=> userId === currentUser)
        return {hostBool: false,
        rsvp: result.invite}
        
    }
    
}