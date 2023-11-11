import { useState } from 'react';
import '../../styles/EventOverview.css';
import {useParams} from 'react-router-dom'
import { EVENT_DATA } from '../../utils/queries';
import { ADD_COMMENT, UPDATE_EVENT, DELETE_EVENT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import EasyEdit from 'react-easy-edit';
import Auth from '../../utils/auth';

const EventOverview = ({ postId }) => {
  const {eventId} = useParams();
  const {loading, data} = useQuery(EVENT_DATA, {
    variables:{id: eventId}
  })
  const events = data?.getEventData|| {};
  const comments = events.comment

  const [commentText, setCommentText] = useState('')
  const [addComment, {error}] = useMutation(ADD_COMMENT)
  
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
const user = Auth.getProfile()

const [isEditable, setIsEditable] = useState(false)

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
