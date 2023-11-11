import { useState } from 'react';
import '../../styles/EventOverview.css';
import {useParams} from 'react-router-dom'
import { EVENT_DATA } from '../../utils/queries';
import { ADD_COMMENT, UPDATE_EVENT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import EasyEdit from 'react-easy-edit'

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

  const [eventData, {eventError}] = useMutation(UPDATE_EVENT)
  const save = (value) => {
    console.log(event.target)

  }
  return (
    <div>
      <section className="post-full mt-5 p-3 rounded bg-white border">
        <h2 className="display-4" >{events.title}</h2>
        <p className="text-muted"><small>Hosted by: {"Host Name"}</small></p>
        <div className="time-section">
        <p className="text-muted">{events.date}</p>
        <p>{events.time}</p>
        </div>
        <p>{events.location}</p>
        <EasyEdit
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: "awesome-input", id: "description"}}
      value={events.description}
      onSave={save}
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
