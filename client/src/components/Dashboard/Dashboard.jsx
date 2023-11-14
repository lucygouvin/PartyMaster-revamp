import { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import Auth from "../../utils/auth"
import { GET_USER_EVENTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import DashboardListItem from './DashboardListItem';

const Dashboard = () => {
    if (!Auth.loggedIn()) {
        return (
            <div className="page-container">
                <h2>Please log in to view your dashboard</h2>
            </div>
        );
    }

    const user = Auth.getProfile();
    const [events, setEvents] = useState([]);
    const { loading, data } = useQuery(GET_USER_EVENTS);

    useEffect(() => {
        if (!loading && data) {
            const fetchedEvents = data.getUserEvents?.event || [];
            setEvents(fetchedEvents);
        }
    }, [loading, data]);

    return (
        <div className="dashboard-page">
            <div className="dashboard">
                <div className="user-profile">
                    <h2>Welcome, {user.data.name}</h2>
                </div>
                <div className="events-overview">
                    <h2 className='event-list__heading'>Your Events</h2>
                    <div className="upcoming-events">
                        {events.length === 0 ? (
                            <p>You have no current events. <a href="/create-event">Click here</a> to create an event.</p>
                        ) : (
                            <>
                                {events.map((event) => (
                                    <DashboardListItem key={event.id} event={event} user={user} />
                                ))}
                                <p><a href="/create-event">Click here</a> to create an event.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
