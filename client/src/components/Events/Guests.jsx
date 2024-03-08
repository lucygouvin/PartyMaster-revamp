import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import "../../styles/Guests.css";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "30%",
  minWidth: "450px",
  maxHeight: "50%",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function Guests({ guests }) {
  const [setRSVP, { RSVPerror }] = useMutation(SET_RSVP);
  const [addGuest, { addGuestError }] = useMutation(ADD_GUEST);
  const [deleteGuest, { deleteGuestError }] = useMutation(DELETE_GUEST);
  const { eventId } = useContext(EventContext);
  const { isHost } = useContext(EventContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [childOpen, setChildOpen] = useState(false);
  const handleChildOpen = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const [value, setValue] = useState(0);

  const [invitee, setInvitee] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Box sx={{ p: 3 }}>
            <p>{children}</p>
          </Box>
        )}
      </div>
    );
  }

  const saveAddGuest = (guestEmail) => {
    try {
      const { data } = addGuest({
        variables: {
          eventId,
          guests: guestEmail,
        },
      });
    } catch (addGuestError) {
      console.error("Unable to add guest", addGuestError);
    }
    setInvitee("")
    handleChildClose()
  };

  const saveDeleteGuest = (guestId) => {
    try {
      const { data } = deleteGuest({
        variables: {
          eventId,
          guestId: guestId,
        },
      });
    } catch (deleteGuestError) {
      console.error("Unable to delete guest", deleteGuestError);
    }
  };

  const saveSetRSVP = () => {
    try {
      const { data } = setRSVP({
        variables: {
          eventId,
          rsvp: "No",
        },
      });
    } catch (RSVPerror) {
      console.error("Unable to save RSVP", RSVPerror);
    }
  };
  return (
    <div className="group guests-group">
      <div className="flex-group">
        <h2>Guests</h2>
        <a href="#">
          {" "}
          <p onClick={handleOpen}>See all</p>
        </a>
      </div>
      <div className="container guest-container">
        <div className="response-numbers">
          <h3>Yes: {guests.rsvpYes.length} </h3>
          <h3>No: {guests.rsvpNo.length} </h3>
          <h3>Maybe: {guests.rsvpMaybe.length} </h3>
          {/* <h3>Not Responded: {guests.rsvpNotResponded.length}</h3> */}
        </div>
        {isHost ? (
          <>
            <button
              className="button cta-button edit-guests"
              onClick={handleOpen}
            >
              Edit Guests
            </button>
          </>
        ) : (
          <button onClick={saveSetRSVP}>Set RSVP</button>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="comment-flex-group">
          <Box sx={style}>
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

            <CustomTabPanel value={value} index={0}>
              {guests.rsvpYes.length ? (
                guests.rsvpYes.map(function (guest, index) {
                  return (
                    <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest"
                      onClick={(event) => saveDeleteGuest(guest.userId._id)}
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
            <CustomTabPanel value={value} index={1}>
              {guests.rsvpNo.length ? (
                guests.rsvpNo.map(function (guest, index) {
                  return (
                    <div className="guest-rsvp" key={index}>
                    <p>{guest.userId.name || guest.userId.email}</p>
                    <button
                      className="delete-guest"
                      onClick={(event) => saveDeleteGuest(guest.userId._id)}
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
            <CustomTabPanel value={value} index={2}>
              {guests.rsvpMaybe.length ? (
                guests.rsvpMaybe.map(function (guest, index) {
                  return (
                    <div className="guest-rsvp" key={index}>
                      <p>{guest.userId.name || guest.userId.email}</p>
                      <button
                        className="delete-guest"
                        onClick={(event) => saveDeleteGuest(guest.userId._id)}
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
            <CustomTabPanel value={value} index={3}>
              {guests.rsvpNotResponded.length ? (
                guests.rsvpNotResponded.map(function (guest, index) {
                  return (
                    <div className="guest-rsvp" key={index}>
                      <p>{guest.userId.name || guest.userId.email}</p>
                      <button
                        className="delete-guest"
                        onClick={(event) => saveDeleteGuest(guest.userId._id)}
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
            <div className="guest-button-group">
              <button className="cancel-button" onClick={handleClose}>
                Close
              </button>
              <button className="button cta-button" onClick={handleChildOpen}>
                Invite Guests
              </button>
            </div>
            <Modal
              open={childOpen}
              onClose={handleChildClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div>
                <Box sx={style}>
                  <textarea placeholder="Enter email addresses separated by commas" value={invitee} onChange={(event) => setInvitee(event.target.value)}></textarea>
                  <div className="guest-button-group">
                  <button className="button cancel-button" onClick={handleChildClose}>Cancel</button>
                  <button className="button cta-button" onClick={(event)=> {
                    const inviteeArray = invitee.split(',')
                    inviteeArray.forEach((el) => saveAddGuest(el))

                  }}>Send invitation</button>
                  </div>
                </Box>
              </div>
            </Modal>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
