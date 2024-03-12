import React from "react";
import { useState, useEffect } from "react";
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

import '../../styles/EventOverview.css'

const EventOverview = () => {
  const { eventId } = useParams();
  const { data: user } = Auth.getProfile();
  let [isHost, setIsHost] = useState(false);
  console.log(user);

  const { loading, data } = useQuery(EVENT, {
    variables: { eventId: eventId },
  });

  useEffect(() => {
    if (loading === false && data) {
      setIsHost(true);
    }
  }, [loading, data]);

  const universalData = {
    eventId,
    user,
    isHost,
  };
  console.log(data);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <EventContext.Provider value={universalData}>
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
            <main>
              <div className="large-column">
                <Details details={data.event.description} />
                <CommentSection commentArray={data.event.comment} />
              </div>

              <div className="small-column">
                <Guests
                  guests={{
                    rsvpYes: data.event.rsvpYes,
                    rsvpNo: data.event.rsvpNo,
                    rsvpMaybe: data.event.rsvpMaybe,
                    rsvpNotResponded: data.event.rsvpNotResponded,
                  }}
                />
                <ContributionSection
                  contributionArray={data.event.contribution} contributionBool={data.event.potluck}
                />
              </div>
            </main>
          </EventContext.Provider>
        </>
      )}
    </div>
  );
};

export default EventOverview;
