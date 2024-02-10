import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EVENT } from "../../utils/queries";
import { EDIT_EVENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, ADD_CONTRIB, DELETE_CONTRIB, EDIT_CONTRIB, SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";
import Auth from "../../utils/auth";

const EventOverview = () => {
  const { eventId } = useParams();

  const { loading, data } = useQuery(EVENT, { variables: { eventId: eventId } });

  const [updateEvent, { eventError }] = useMutation(EDIT_EVENT);
  const [addGuest, {addGuestError}] = useMutation(ADD_GUEST)
  const [deleteGuest, {deleteGuestError}] = useMutation(DELETE_GUEST)
  const [setRSVP, {RSVPerror}] = useMutation(SET_RSVP)
  const [addComment, {addCommentError}] = useMutation(ADD_COMMENT)
  const [editComment, {editCommentError}] = useMutation(EDIT_COMMENT)
  const [deleteComment, {deleteCommentError}] = useMutation(DELETE_COMMENT)

  const saveEventDetails = () => {
    try {
        const {data} = updateEvent({
            variables: {
                id: eventId,
                title: "Edit test 4"
            }
        })
    }
    catch (eventError) {
        console.error("Unable to update event", eventError);
      }
  }

  const saveAddGuest = () => {
    try {
        const {data} = addGuest({
            variables: {
                eventId: eventId,
                guests: "AsmimmonX@gmail.com"
            }

        })

    } catch (addGuestError) {
        console.error("Unable to add guest", addGuestError)
    }
  }

  const saveDeleteGuest = () => {
    try {
        const {data} = deleteGuest({
            variables: {
                eventId: eventId,
                guestEmail: "AsmimmonX@gmail.com"
            }

        })

    } catch (deleteGuestError) {
        console.error("Unable to delete guest", deleteGuestError)
    }
  }

  const saveSetRSVP  = () => {
    try {
      const {data} = setRSVP({
        variables: {
          eventId: eventId,
          rsvp: "No"
        }
      })

    }catch (RSVPerror){
      console.error("Unable to save RSVP", RSVPerror)
    }

  }

  const saveAddComment = () => {
    try {
      const {data} = addComment({
        variables: {
          eventId: eventId,
          content:  "Content from button"
        }
      })

    }catch (addCommentError){
      console.error("Unable to add comment", addCommentError)
    }
  }

  const saveEditComment = () => {
    try {
      const {data} = editComment({
        variables: {
          eventId: eventId,
          comment: {
            _id: "65c79f119125ea6118979d45",
            content: "Edited from button again"
          }
        }
      })

    }catch (editCommentError){
      console.error("Unable to edit comment", editCommentError)
    }
  }

  const saveDeleteComment = () => {
    try {
      const {data} = deleteComment({
        variables: {
          eventId: eventId,
          commentId: "65c7a29c47409d66f8233419"
        }
      })

    }catch (deleteCommentError){
      console.error("Unable to delete comment", deleteCommentError)
    }
  }


  console.log(data)

  return (
    <div>
        {loading? <p>Loading...</p>:
   <>
      <p>Congration u done it</p>
      <p>Title: {data.event.title}</p>
      <p>Host Name: {data.event.hostID.name}</p>
      <p>Start Time: {data.event.startTime}</p>
      <p>End Time: {data.event.endTime}</p>
      <p>Location: {data.event.location}</p>
      <p>Description: {data.event.description}</p> 
      <p>Potluck: {data.event.potluck.toString()}</p>
      <p>Guests:</p>
      <button onClick={saveAddGuest}>Add Guest</button>
      <button onClick={saveDeleteGuest}>Delete Guest</button>
      <button onClick={saveSetRSVP}>Set RSVP</button>
      {data.event.RSVP.map(function(guest){
        return (<p>{guest.userId.name||guest.userId.email}, {guest.invite}</p>)
      })}
      <p>Comments:</p>
      <button onClick={saveAddComment}>Add Comment</button>
      <button onClick={saveEditComment}>Edit Comment</button>
      <button onClick={saveDeleteComment}>Delete Comment</button>
      {data.event.comment.map(function(comment){
        return (<p>{comment.userId.name||comment.userId.email}, {comment.content}</p>)
      })}
      <p>Contributions:</p>
      {data.event.contribution.map(function(contribution){
        return (<p>{contribution.userId.name||contribution.userId.email}, {contribution.item}</p>)
      })}
      <button onClick={saveEventDetails}>Update Event Test</button>
    </>
  }
    </div>
  );
};

export default EventOverview;
