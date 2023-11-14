import { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import Auth from "../../utils/auth"
import { GET_USER_EVENTS} from '../../utils/queries';
import { useQuery } from '@apollo/client';
import DashboardListItem from './DashboardListItem';


const Dashboard = () => {
     const user = Auth.getProfile()
     const [events, setEvents] = useState()
     const {loading, data} = useQuery(GET_USER_EVENTS)
     console.log(data)
  
     useEffect(() =>{
        if (loading === false && data){
            const events = data?.getUserEvents || {}
            setEvents(events.event)
        }
     },[loading, data])

     console.log(events)


    return (
        <div>
       { Auth.loggedIn() ? (<div className="landing-page">
            <div className="dashboard">
                <div className="user-profile">
                    <h2>Welcome, {user.data.name}</h2>
                </div>
                <div className="events-overview">
                    <h2 className='event-list__heading'>Your Events</h2>
                    <div className="upcoming-events">
                        {/* <h3>Upcoming Events</h3> */}
                        {events && 
                        events.map((events)=> (
                            <DashboardListItem events={events} user={user}/>
                        ))}
                      
                       
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
