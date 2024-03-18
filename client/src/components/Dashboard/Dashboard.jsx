import '../../styles/Dashboard.css'
import Auth from "../../utils/auth"
import { USER_EVENTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import DashboardListItem from './DashboardListItem';

const Dashboard = () => {
    const { data: user } = Auth.getProfile();
    const { loading, data } = useQuery(USER_EVENTS)

    console.log(user)

    return (
       <div className='full-page content-padding'>
        {loading ? (
            <p>Loading...</p>
        ): (
            <>
            {user? (
                <>
                <div className='flex-group'>
                <h2>Welcome, {user.name}</h2>
                <button className="button cancel-button" onClick={Auth.logout}>Log Out</button>
                </div>
                <h3>Your Events</h3>
                {data.userEvents.event.length>0?(
                    <>
                    {data.userEvents.event.map((event, index)=> {
                        return <DashboardListItem events={event} user={user} key={index}/>
                    })}
                    </>
                ): (
                    <p>No events</p>
                )}
                </>
            ): (
            <>
            <p>Please log in to see your dashboard.</p>
            </>)}
            </>
        )}
       </div>
    );
};

export default Dashboard;
