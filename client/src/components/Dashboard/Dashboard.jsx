// Import necessary dependencies
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../../styles/Dashboard.css';


const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [userData, setUserData] = useState({});
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const userRes = await axios.get('/api/user');
                const eventsRes = await axios.get('/api/events');
                setUserData(userRes.data);
                setEvents(eventsRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="landing-page">
            <header className="landing-header"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h1 className={isHovered ? 'hide' : ''}>Welcome to PartyMaster</h1>
                <h1 className={isHovered ? '' : 'hide'}>Your go-to for planning and managing social events.</h1>
            </header>
            <div className="dashboard">
                <div className="user-profile">
                    <h2>Welcome, {userData.name}</h2>
                </div>
                <div className="events-overview">
                    <h2>Your Events</h2>
                    <div className="upcoming-events">
                        <h3>Upcoming Events</h3>
                        <ul>
                            {events.filter(event => new Date(event.date) > new Date()).map(event => (
                                <li key={event.id}>{event.title} on {new Date(event.date).toLocaleDateString()}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="past-events">
                        <h3>Past Events</h3>
                        <ul>
                            {events.filter(event => new Date(event.date) < new Date()).map(event => (
                                <li key={event.id}>{event.title} on {new Date(event.date).toLocaleDateString()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="landing-footer">
                <p>&copy; 2023 PartyMaster</p>
            </footer>
        </div>
    );
};

export default Dashboard;
