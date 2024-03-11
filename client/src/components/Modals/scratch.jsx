import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { EventContext } from "../Events/EventContext";
import { SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";

import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "../../styles/Modal.css";
import ConfirmDeleteModal from "./ConfirmDelete";

export default function TabbedDisplayModal({
  isActive,
  guests,
  onClose,
  onAction,
  onDelete
}) {

    const [addGuest, { addGuestError }] = useMutation(ADD_GUEST);
    const [deleteGuest, { deleteGuestError }] = useMutation(DELETE_GUEST);
    const { eventId } = useContext(EventContext);
    const { isHost } = useContext(EventContext);

        // State management for delete modal
        const [delOpen, setDelOpen] = useState(false);
        const handleDelOpen = () => setDelOpen(true);
        const handleDelClose = () => setDelOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    handleDelClose()
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
          <div>
            <p>{children}</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <Modal open={isActive}>
      <div className="comment-flex-group">
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
                      onClick={onDelete}
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
                      onClick={onDelete}
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
                      onClick={onDelete}
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
                      className="delete-guest"
                      onClick={onDelete}
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
            <button className="cancel-button" onClick={onClose}>
              Close
            </button>
            <button className="button cta-button" onClick={onAction}>
              Invite Guests
            </button>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal isActive={delOpen} title={"Are you sure you want to remove this guest?"} onClose={handleDelClose} onDelete={(event) => saveDeleteGuest(guest.userId._id)}></ConfirmDeleteModal>


    </Modal>
  );
}
