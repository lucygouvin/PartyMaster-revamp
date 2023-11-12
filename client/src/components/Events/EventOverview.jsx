// Import Hooks
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

// Import Queries and Mutations
import { EVENT_DATA } from '../../utils/queries';
import { UPDATE_EVENT, DELETE_EVENT} from '../../utils/mutations';

// Import Styling
import '../../styles/EventOverview.css';

// Import utils and custom elements
import Auth from '../../utils/auth';
import getUserRole from '../../utils/userRole';
import Comment from '../Communication/Comments'
import CommentForm from '../Communication/CommentForm';
import Contribution from '../Contributions/ContributionCoordination';
import RSVP from '../Communication/RSVP';
import EventDetails from './EventDetails';

const EventOverview = () => {
  // Get the logged in user
  const user = Auth.getProfile()
  // Get the event ID from the URL params
  const {eventId} = useParams();
  // Set up useState hooks for the data we'll need
  let [title, setTitle] = useState('')
  let [date, setDate] = useState('')
  let [time, setTime] = useState('')
  let [location, setLocation] = useState('')
  let [description, setDescription] = useState('')
  let [comments, setComments]= useState()
  let [rsvp, setRSVP] = useState([])
  let [rsvpMaybe, setRsvpMaybe] = useState([])
  let [rsvpYes, setRsvpYes] = useState([])
  let [rsvpNo, setRsvpNo] = useState([])
  let [contributions, setContributions] = useState([])
  let [hostID, setHostID] = useState('')
  let [userResponse, setUserResponse] = useState({hostBool:false, rsvp:""})
  const [isEditable, setIsEditable] = useState(false)

  const toggleEditable = () => {
    setIsEditable(!isEditable)
  }
  // Set up mutations
  const [updateEvent, {eventError}] = useMutation(UPDATE_EVENT)
  const [deleteEvent, {deleteError}] = useMutation(DELETE_EVENT)

  const saveEventDetails = () => {
    try {
      const {data} = updateEvent({
        variables: {
          id: eventId,
          description,
          title,
          location,
          date,
          time,
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  
  }
  const delEvent = () => {
    try {
      const {data} = deleteEvent({
        variables: {
          id: eventId
        }
      })
      window.location.href="/dashboard";
    }catch (eventError) {
      console.error('Unable to delete event', eventError)
    }
  }
  
  // Query the event data
  const {loading, data} = useQuery(EVENT_DATA, {
    variables:{id: eventId}
  })
// wait for the event data to be returned, then set all the values
  useEffect(()=>{
    if (loading===false && data){
      const events = data?.getEventData|| {};
      setTitle(events.title);
      setDate(events.date);
      setTime(events.time);
      setLocation(events.location);
      setDescription(events.description);
      setComments(events.comment);
      setRSVP(events.RSVP);
      setRsvpMaybe(events.rsvpMaybe)
      setRsvpYes(events.rsvpYes)
      setRsvpNo(events.rsvpNo)
      setContributions(events.potluckContributions)
      setHostID(events.hostID)
    }
  }, [loading, data])
// Wait for the event data to come back, and then derive additional information
  useEffect(()=>{
    if (hostID && rsvp){
      console.log(hostID)
      setUserResponse(getUserRole(hostID, rsvp, user.data._id))
    }
  },[hostID, rsvp]) 

  return (
    <div>
      {userResponse.hostBool? (
        <div className='edit-buttons'>
        <button onClick={toggleEditable} >Edit</button>
        <button onClick={delEvent}>Delete</button>
        <button onClick={saveEventDetails}>Save</button>
        </div>
      ):(<></>)}

      <section className="post-full mt-5 p-3 rounded bg-white border">
        <EventDetails title={title} date={date} time={time} location={location} description={description} isEditable={isEditable}/>
      </section>

      <section className='rsvp-container'>
      <RSVP userResponse={userResponse} rsvpYes={rsvpYes} rsvpNo={rsvpNo} rsvpMaybe={rsvpMaybe} eventId={eventId} user={user} />
      </section>

      <section className='contributions-container'>
        {contributions && (
           <Contribution contributions={contributions} eventId={eventId}/>
        )}
      </section>

      <section className="comments-container">
        {comments &&
        comments.map((comment)=> (
          <Comment comment={comment} key={comment.commentId}/>
        ))}
      </section>

      <section className='commentForm'>
        <CommentForm eventId={eventId} />
      </section>
  </div> 
  );
 };

export default EventOverview;
