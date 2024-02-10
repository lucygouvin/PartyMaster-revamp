import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EVENT } from "../../utils/queries";
import { EDIT_EVENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, ADD_CONTRIB, CLAIM_CONTRIB, DELETE_CONTRIB, EDIT_CONTRIB, UNCLAIM_CONTRIB, SET_RSVP, ADD_GUEST, DELETE_GUEST } from "../../utils/mutations";
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
  const [addContrib, {addContribError}] = useMutation(ADD_CONTRIB)
  const [editContrib, {editContribError}] = useMutation(EDIT_CONTRIB)
  const [claimContrib, {claimContribError}] = useMutation(CLAIM_CONTRIB)
  const [deleteContrib, {deleteContribError}] = useMutation(DELETE_CONTRIB)
  const [unclaimContrib, {unclaimContribError}] = useMutation(UNCLAIM_CONTRIB)

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

  const saveAddContrib = () => {
    try {
      const {data} = addContrib ({
        variables: {
        eventId: eventId,
        contribution: "snacks",
        userId: "659342c99429127b5e676c82"
      }

      })

    }catch(addContribError) {
      console.error("Unable to add contribution", addContribError)
    }
  }

  const saveEditContrib = () => {
    try {
      const {data} = editContrib ({
        variables: {
          eventId: eventId,
          item: "dip",
          contributionId: "65c7a73eb0c018697d0eca6a",
        }
        
      })

    }catch(editContribError) {
      console.error("Unable to edit contribution", editContribError)
    }
  }

  const saveClaimContrib = () => {
    try {
      const {data} = claimContrib ({
        variables: {
          eventId: eventId,
          contributionId: "65c7a73eb0c018697d0eca6a",
        }
        
      })

    }catch(claimContribError) {
      console.error("Unable to edit contribution", claimContribError)
    }
  }

  const saveDeleteContrib = () => {
    try {
      const {data} = deleteContrib ({
        variables:{
          eventId: eventId,
          contributionId: "65c7a7e7d943ac1d566f65f6"
        }
        
      })

    }catch(deleteContribError) {
      console.error("Unable to delete contribution", deleteContribError)
    }
  }

  const saveUnclaimContrib = () => {
    try {
      const {data} = unclaimContrib ({
        variables: {
          eventId: eventId,
          contributionId: "65c7a73eb0c018697d0eca6a",
        }
        
      })

    }catch(unClaimContribError) {
      console.error("Unable to edit contribution", unClaimContribError)
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
      <button onClick={saveAddContrib}>Add Contrib</button>
      <button onClick={saveEditContrib}>Edit Contrib</button>
      <button onClick={saveDeleteContrib}>Delete Contrib</button>
      <button onClick={saveClaimContrib}>Claim Contrib</button>
      <button onClick={saveUnclaimContrib}>Unclaim Contrib</button>


      {data.event.contribution.map(function(contribution){
        return (<p>{contribution.userId? contribution.userId.name : "Unclaimed"}, {contribution.item}</p>)
      })}
      <button onClick={saveEventDetails}>Update Event Test</button>
    </>
  }
    </div>
  );
};

export default EventOverview;
