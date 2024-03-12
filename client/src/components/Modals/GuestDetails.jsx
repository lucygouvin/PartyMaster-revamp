import { useState } from "react";

import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "../../styles/Modal.css";

export default function GuestDetailsModal({
  isActive,
  guests,
  onClose,
  onAction,
  onDelete,
  setDel
}) {
  
  // State management for 
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Create CustomTabPanel element
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            <p>{children}</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <Modal open={isActive}>
        <div className="modal">
          {/* Define tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Yes" />
            <Tab label="No" />
            <Tab label="Maybe" />
            <Tab label="Not Responded" />
          </Tabs>

          {/* Yes RSVPs */}
          <CustomTabPanel value={value} index={0}>
            {guests.rsvpYes.length ? (
              guests.rsvpYes.map(function (guest, index) {
                return (
                  <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest"
                      value={guest.userId._id}
                      onClick={setDel}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                <i>None</i>
              </>
            )}
          </CustomTabPanel>

          {/* No RSVPs */}
          <CustomTabPanel value={value} index={1}>
            {guests.rsvpNo.length ? (
              guests.rsvpNo.map(function (guest, index) {
                return (
                  <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest"
                      value={guest.userId._id}
                      onClick={setDel}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                <i>None</i>
              </>
            )}
          </CustomTabPanel>

          {/* Maybe RSVPs */}
          <CustomTabPanel value={value} index={2}>
            {guests.rsvpMaybe.length ? (
              guests.rsvpMaybe.map(function (guest, index) {
                return (
                  <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest"
                      value={guest.userId._id}
                      onClick={setDel}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                <i>None</i>
              </>
            )}
          </CustomTabPanel>

          {/* Not Responded RSVPs */}
          <CustomTabPanel value={value} index={3}>
            {guests.rsvpNotResponded.length ? (
              guests.rsvpNotResponded.map(function (guest, index) {
                return (
                  <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest" value={guest.userId._id}
                      onClick={setDel}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                <i>None</i>
              </>
            )}
          </CustomTabPanel>
          <div className="modal-button-group">
            {/* Closes modal */}
            <button className="cancel-button" onClick={onClose}>
              Close
            </button>
            {/* Invokes invitation modal */}
            <button className="button cta-button" onClick={onAction}>
              Invite Guests
            </button>
          </div>
      </div>

      
    </Modal>
  );
}
