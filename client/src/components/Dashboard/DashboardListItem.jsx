import getUserRole from '../../utils/userRole';

export default function DashboardListItem ({events, user}){
    console.log("FROM COMP", events)
    const userResult = getUserRole(events.hostID, events.RSVP,user.data._id)
    console.log(userResult)


    return(
        <div key={events._id} className="event-list__item">
            <div>
            <a href={`/event/${events._id}`}><p>{events.title} hosted by {events.hostID}</p></a>
            <p>{events.date} at {events.time}, {events.location}</p>
            </div>
            <div>{userResult.hostBool?(
                <p>Host</p>
            ):(<p>{userResult.rsvp}</p>)}</div>
        </div>
    )
}