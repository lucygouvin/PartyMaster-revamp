// import React, { useState } from "react";
import "../../styles/Invitation.css";
// import { useQuery } from '@apollo/client';
// import { CREATE_EVENT } from '../../utils/mutations';

export function Invitation(props) {

  return (
    <section>
      <div className="invitation-container">
      <h2>Create Event</h2>
        <form className="invitation-form">
          <div className="form-group">
            <label className="form-label">Event title</label>
            <input
              type="text"
              id="invitation-title"
              className="form-control"
              required
              placeholder="New Event"
            />
          </div>

          <div className="form-group-time">
            <label className="form-label"> Date</label>
            <input
              type="text"
              id="invitation-date"
              className="form-control-time"
              required
              placeholder=""
            />
          </div>

          <div className="form-group-time">
            <label className="form-label">
              {/* {" "} */}
              Time, date and time to be side by side
            </label>
            <input
              type="text"
              id="inviation-time"
              className="form-control-time"
              required
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address/Location</label>
            <input
              type="text"
              id="invitation-date"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label"> Description</label>
            <input
              type="text"
              id="invitation-description"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {" "}
              Guests, this we need implement how to send invites
            </label>
            <input
              type="text"
              id="invitation-guest"
              className="form-control"
              required
            />
          </div>

          <button className="create-btn"> Create</button>
        </form>
      </div>
    </section>
  );
}

export default Invitation;
