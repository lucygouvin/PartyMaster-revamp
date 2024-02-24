import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EVENT } from "../../utils/queries";
import Auth from "../../utils/auth";
import Headline from "./Headline";
import Details from "./Details";
import Guests from "./Guests";
import CommentSection from "./CommentSection";
import ContributionSection from "./ContributionSection";
import { EventContext } from "./EventContext";

const EventOverview = () => {
  const { eventId } = useParams();

  const { loading, data } = useQuery(EVENT, {
    variables: { eventId: eventId },
  });

  console.log(data);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <EventContext.Provider value={eventId}>
            <Headline
              headline={{
                title: data.event.title,
                date: data.event.date,
                startTime: data.event.startTime,
                endTime: data.event.endTime,
                hostName: data.event.hostID.name,
                location: data.event.location,
              }}
            />
            <Details details={data.event.description} />
            <Guests
              guests={{
                rsvpYes: data.event.rsvpYes,
                rsvpNo: data.event.rsvpNo,
                rsvpMaybe: data.event.rsvpMaybe,
                rsvpNotResponded: data.event.rsvpNotResponded,
              }}
            />
            <CommentSection commentArray={data.event.comment} />

            <ContributionSection contributionArray={data.event.contribution} />
          </EventContext.Provider>
        </>
      )}
    </div>
  );
};

export default EventOverview;
