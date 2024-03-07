import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "border-radius": "15px",
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

  const [value, setValue] = useState(0);

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
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const saveAddGuest = () => {
    try {
      const { data } = addGuest({
        variables: {
          eventId,
          guests: "RonHensom@gmail.com",
        },
      });
    } catch (addGuestError) {
      console.error("Unable to add guest", addGuestError);
    }
  };

  const saveDeleteGuest = () => {
    try {
      const { data } = deleteGuest({
        variables: {
          eventId,
          guestEmail: "RonHensom@gmail.com",
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
        <h3>Yes: {guests.rsvpYes.length} </h3>
        <h3>No: {guests.rsvpNo.length} </h3>
        <h3>Maybe: {guests.rsvpMaybe.length} </h3>
        <h3>Not Responded: {guests.rsvpNotResponded.length}</h3>
        {isHost ? (
          <>
            <button onClick={saveAddGuest}>Add Guest</button>
            <button onClick={saveDeleteGuest}>Delete Guest</button>
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
            {guests.rsvpYes.map(function(guest) {
                return <p>{guest.userId.name || guest.userId.email}</p>
              })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {guests.rsvpNo.map(function(guest) {
                return <p>{guest.userId.name || guest.userId.email}</p>
              })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            {guests.rsvpMaybe.map(function(guest) {
                return <p>{guest.userId.name || guest.userId.email}</p>
              })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            {guests.rsvpNotResponded.map(function(guest) {
                return <p>{guest.userId.name || guest.userId.email}</p>
              })}
            </CustomTabPanel>
            <div>
              <button className="cancel-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
