import getUserRole from "../../utils/userRole";

export default function DashboardListItem({ events, user }) {
  const userResult = getUserRole(events.hostID, events.RSVP, user.data._id);

  return (
    <div key={events._id} className="event-list__item">
      <div className="event-info">
        <a href={`/event/${events._id}`}>
          <p>
           <span  className="title-text"> {events.title} </span> <span className="muted-text">hosted by {events.hostID}</span>
          </p>
        </a>
        <p>
          {events.date} at {events.time}, {events.location}
        </p>
      </div>
      <div className="user-role">{userResult.hostBool ? <p>Host</p> : <p>{userResult.rsvp}</p>}</div>
    </div>
  );
}
