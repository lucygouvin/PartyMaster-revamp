import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EVENT } from "../../utils/queries";
import Auth from "../../utils/auth";

const EventOverview = () => {
  const { eventId } = useParams();

  const { loading, data } = useQuery(EVENT, { variables: { eventId: eventId } });

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
      {data.event.RSVP.map(function(guest){
        return (
        <>
        <p>{guest.userId.name||guest.userId.email}, {guest.invite}</p>
        </>
            )
      })}
      {data.event.comment.map(function(comment){
        return (
        <>
        <p>{comment.userId.name||comment.userId.email}, {comment.content}</p>
        </>
            )
      })}
      {data.event.contribution.map(function(contribution){
        return (
        <>
        <p>{contribution.userId.name||contribution.userId.email}, {contribution.item}</p>
        </>
            )
      })}
      
        
    

    </>
  }
    </div>
  );
};

export default EventOverview;
