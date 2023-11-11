import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import Auth from "../../utils/auth"
import { GET_USER_EVENTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const Dashboard = () => {
     const user = Auth.getProfile()

     const {loading, data} = useQuery(GET_USER_EVENTS)

     const events = data?.getUserEvents || {}
    console.log(events)

    return (
        <div>
       { Auth.loggedIn() ? (<div className="landing-page">
            <div className="dashboard">
                <div className="user-profile">
                    <h2>Welcome, {user.data.name}</h2>
                </div>
                <div className="events-overview">
                    <h2>Your Events</h2>
                    <div className="upcoming-events">
                        {/* <h3>Upcoming Events</h3> */}
                        {events.event &&
                        events.event.map ((event) => (
                            <div>
                                <a href={`/event/${event._id}`}><p>{event.title} hosted by {event.hostId}</p></a>
                                <p>{event.date} at {event.time}, {event.location}</p>
                                </div>
                        )
                        )}
                    </div>
                    {/* <div className="past-events">
                        <h3>Past Events</h3>
                        <ul>
                            {events.filter(event => new Date(event.date) < new Date()).map(event => (
                                <li key={event.id}>{event.title} on {new Date(event.date).toLocaleDateString()}</li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>) : 
        (<h2>Please log in to view your dashboard</h2>)
    
    }
    </div>
    );
};

export default Dashboard;
