import { useState } from "react";
import { useMutation } from "@apollo/client";
import getUserRole from "../../utils/userRole";
import { UPDATE_RSVP } from "../../utils/mutations";
import Auth from '../../utils/auth'

export default function DashboardListItem({ events, user }) {
  console.log(events)
  const userName = Auth.getProfile()
  const { hostBool, rsvp } = getUserRole(
    events.hostID,
    events.RSVP,
    user.data._id
  );
  let [guestRSVP, setGuestRSVP] = useState(rsvp)
  const [updateRSVP, {rsvpError}] = useMutation(UPDATE_RSVP)

  const saveRSVP = (value) => {
    setGuestRSVP(value)
    try {
      const { data } = updateRSVP({
        variables: {
          id: events._id,
          rsvp: {
            userId: user.data._id,
            invite: value,
          },
        },
      });

    } catch (rsvpError) {
      console.error("Unable to update RSVP", rsvpError);
    }
  };

  return (
    <div key={events._id} className="event-list__item">
      <div className="event-info">
        <a href={`/event/${events._id}`}>
          <p>
            <span className="title-text"> {events.title} </span>{" "}
            {/* <span className="muted-text">hosted by {user.hostID} {userName.data.name}</span> */}
          </p>
        </a>
        <p>
          {events.date} at {events.time}, {events.location}
        </p>
      </div>
      <div className="user-role">
        {!hostBool ? (
          <>
            {guestRSVP === "Maybe" ? (
              <>
                <div className="quick-rsvp">
                  <h3>RSVP</h3>
                  <div className="button-group">
                    <button  id="quick-rsvp-yes">
                      <img src="/checkmark_icon.png" onClick={()=>saveRSVP("Yes")}/>
                    </button>
                    <button id="quick-rsvp-no">
                      <img src="/x_icon.svg" onClick={()=>saveRSVP("No")} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>RSVP</p>
                {guestRSVP === "Yes" ? (
                  <img src="/checkmark_icon.png" />
                ) : (
                  <img src="/x_icon.svg" />
                )}
              </>
            )}
          </>
        ) : (
          <h3>Host</h3>
        )}
      </div>
      {/* <div className="user-role">{userResult.hostBool ? <p>Host</p> : <p>{userResult.rsvp}</p>}</div> */}
    </div>
  );
}
