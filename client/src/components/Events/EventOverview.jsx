import { useState, useEffect } from 'react';
import '../../styles/EventOverview.css';
import {useParams} from 'react-router-dom'
import { EVENT_DATA } from '../../utils/queries';
import { ADD_COMMENT, UPDATE_EVENT, DELETE_EVENT, UPDATE_RSVP, ADD_CONTRIBUTION } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import EasyEdit from 'react-easy-edit';
import Auth from '../../utils/auth';
import getUserRsvp from '../../utils/userRSVP';

const EventOverview = ({ postId }) => {
  const {eventId} = useParams();
  const {loading, data} = useQuery(EVENT_DATA, {
    variables:{id: eventId}
  })
  const events = data?.getEventData|| {};
  console.log(events)
  const comments = events.comment
  const rsvp = events.RSVP ||[]
  const rsvpMaybe = events.rsvpMaybe ||[]
  const rsvpYes=events.rsvpYes || []
  const rsvpNo=events.rsvpNo || []
  const contributions = events.potluckContributions

  const [commentText, setCommentText] = useState('')
  const [addComment, {error}] = useMutation(ADD_COMMENT)
  const [addContribution, {contribError}] = useMutation(ADD_CONTRIBUTION)
  
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const {data} = addComment({
        variables: {
          id: eventId,
          comment: {
            content: commentText
          }
        }
      })
      window.location.reload();
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  let [description, setDescription] = useState()
  description = events.description

  let [location, setLocation] = useState()
  location = events.location

  let [date, setDate] = useState()
  date = events.date

  let [time, setTime] = useState()
 time = events.time

 let [title, setTitle] = useState()
 title = events.title

  const [updateEvent, {eventError}] = useMutation(UPDATE_EVENT)
  const [deleteEvent, {deleteError}] = useMutation(DELETE_EVENT)
  const [updateRSVP, {rsvpError}] = useMutation(UPDATE_RSVP)
  const saveDescription = (value) => {
    try {
      const {data} = updateEvent({
        variables: {
          description: value,
          id: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  }
  const saveLocation = (value) => {
    try {
      const {data} = updateEvent({
        variables: {
          location: value,
          id: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  }

  const saveTime = (value) => {
    try {
      const {data} = updateEvent({
        variables: {
          time: value,
          id: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  }

  const saveDate = (value) => {
    try {
      const {data} = updateEvent({
        variables: {
          date: value,
          id: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  }

  const saveTitle = (value) => {
    try {
      const {data} = updateEvent({
        variables: {
          title: value,
          id: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  }

  const saveContribution = () => {
    try {
      const {data} = addContribution({
        variables: {
          contribution: {
            item: contrib
          },      
          eventId: eventId
        }
        
      })
    }catch (eventError) {
      console.error('Unable to update event', eventError)
    }
  setContrib('')
  }
const user = Auth.getProfile()

let userResponse = getUserRsvp(rsvp, user.data._id)
const [isEditable, setIsEditable] = useState(false)
let [guestRSVP, setGuestRSVP] = useState(userResponse)
const [contrib, setContrib] = useState('')

const save=(value) =>{
  setGuestRSVP(value)
  toggleEditable()
  try {
    const {data} = updateRSVP({
      variables: {
        id: eventId,
        rsvp: {
          userId: user.data._id,
          invite: value
        }
      }
    })
    }catch(rsvpError){
        console.error('Unable to update RSVP', rsvpError)

      } 
  }

const toggleEditable = () => {
  setIsEditable(!isEditable)
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
  return (
    <div>
      {user.data._id === events.hostID? (
        <>
      
       <button onClick={toggleEditable}>Edit</button>
       <button onClick={delEvent}>Delete</button>
        </>

      ):(<></>)}

      {rsvp.map((response) => response.userId).includes(user.data._id)?(
        <p>You're a guest</p>
      ):<p>You're not a guest</p>}
            
      <section className="post-full mt-5 p-3 rounded bg-white border">
        <h2 className="display-4" >
        <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={title}
      allowEdit={isEditable}
      onSave={saveTitle}
    />
        </h2>
        <p className="text-muted"><small>Hosted by: {"Host Name"}</small></p>
        <div className="time-section">
        <EasyEdit
      type="date"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={date}
      allowEdit={isEditable}
      onSave={saveDate}
    />
         <EasyEdit
      type="time"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={time}
      allowEdit={isEditable}
      onSave={saveTime}
    />
        </div>
        <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={location}
      allowEdit={isEditable}
      onSave={saveLocation}
    />
        <EasyEdit
      type="textarea"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      value={description}
      allowEdit={isEditable}
      onSave={saveDescription}
    />
        </section>
      <section className='rsvp-container'>
      {rsvp.map((response) => response.userId).includes(user.data._id)?(
        <>
        <p>You're a guest</p>
       
        <h3>Your RSVP:{guestRSVP||userResponse}</h3>
        <button onClick={toggleEditable} hidden={!isEditable}>Change RSVP</button>
        <EasyEdit
  type="select"
  options={[
      {label: "Yes", value: 'yes'},
      {label: 'No', value: 'no'},
      {label: 'Maybe', value: 'maybe'}]}
  allowEdit={isEditable}
  placeholder={userResponse}
  onSave={save}
/>
        <p>{rsvpYes.length} Going</p>
        <p>{rsvpNo.length} Not going</p>
        <p>{rsvpMaybe.length} Maybe going</p>
        </>

      ):<>
        <p>You're not a guest</p>
        <h3>RSVPs</h3>
        <p>Yes: {rsvpYes.length}</p>
        <p>No: {rsvpNo.length}</p>
        <p>Maybe: {rsvpMaybe.length}</p>
        </>}

      </section>

      <section className='contributions-container'>
      {contributions &&
          contributions.map((contrib) => (
            <div className="post p-3 rounded bg-light border mb-3 " key={contrib._id}>
            <p>{contrib.item} claimed by {contrib.name}</p>
          </div>
          ))}
          <input type='text' value = {contrib} onChange={(event)=> setContrib(event.target.value)}></input> <button onClick={saveContribution}>Add</button>
          {/* <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      onSave={saveContribution}
      value={''}
      placeholder={"Add contribution"}
    /> */}

      </section>

      <section className="mt-5">
          {comments &&
          comments.map((comment) => (
            <div className="post p-3 rounded bg-light border mb-3 comment-item" key={comment.commentId}>
            <p>by {comment.userId} </p>
            <p>{comment.content}</p>
          </div>
          ))}
        </section>

        <section className="comment-form" id="commentForm">
      <form onSubmit={handleCommentSubmit} className="p-3 rounded bg-white border">
        <div className="form-group">
          <label htmlFor="comment_text">Add a comment:</label>
          <textarea className="form-control" id="comment_text" name="comment_text" rows="3" value={commentText} required onChange={(event)=> setCommentText(event.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </section>
     
  </div> 

  );
 };

export default EventOverview;
