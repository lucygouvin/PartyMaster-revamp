export default function getUserRole (hostID, rsvpList, currentUser){
    console.log("HOSTID",hostID)
    console.log(rsvpList)
    console.log("CURRENT USER", currentUser)
    if (hostID === currentUser){
        console.log("true")
        return {hostBool: true,
        rsvp:''}
    }
    if (rsvpList.length){
        const result = rsvpList.find(({userId})=> userId === currentUser)
        console.log("RESULT", result)
        return {hostBool: false,
        rsvp: result.invite}
        
    }
    
}