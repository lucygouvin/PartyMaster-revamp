import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
// import axios from 'axios';
import '../../styles/EventOverview.css'; // Make sure this path is correct
import { EVENT_DATA } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const EventOverview = ({ postId }) => {
  const {eventId} = useParams();
  const {loading, data} = useQuery(EVENT_DATA, {
    variables:{id: "654d687f3a54971fdb17d087"}
  })
  const events = data?.getEventData|| {};
  const comments = events.comment
  console.log(eventId)
  console.log( events)
  console.log(comments)
  // const [post, setPost] = useState(null);
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   // Fetch the post data
  //   async function fetchPost() {
  //     try {
  //       const response = await axios.get(`/api/posts/${postId}`);
  //       setPost(response.data);
  //     } catch (error) {
  //       console.error('Error fetching post data', error);
  //     }
  //   }

  //   // Fetch the comments data
  //   async function fetchComments() {
  //     try {
  //       const response = await axios.get(`/api/posts/${postId}/comments`);
  //       setComments(response.data);
  //     } catch (error) {
  //       console.error('Error fetching comments', error);
  //     }
  //   }

  //   fetchPost();
  //   fetchComments();
  // }, [postId]);

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/api/posts/${postId}`);
  //     // Here you would handle the UI update after deletion
  //   } catch (error) {
  //     console.error('Error deleting post', error);
  //   }
  // };

  // const handleCommentSubmit = async (event) => {
  //   event.preventDefault();
  //   const commentText = event.target.comment_text.value;
  //   try {
  //     await axios.post(`/api/posts/${postId}/comments`, { comment_text: commentText });
  //     // Here you would handle the UI update after adding a comment
  //   } catch (error) {
  //     console.error('Error submitting comment', error);
  //   }
  // };

  return (
    <div>
      <section className="post-full mt-5 p-3 rounded bg-white border">
        <h2 className="display-4">{events.title}</h2>
        <p className="text-muted"><small>Hosted by: {"Host Name"}</small></p>
        <p className="text-muted"><small>{events.location} at {events.time}</small></p>
        <p>{events.description}</p>
        </section>

      <section className="mt-5">
          {comments &&
          comments.map((comment) => (
            <div className="post p-3 rounded bg-light border mb-3">
            <p>by {"Username"} </p>
            <p>{comment.content}</p>
          </div>

          ))}
        </section>

        <section className="comment-form mt-5" id="commentForm">
      <form className="p-3 rounded bg-white border">
        <div className="form-group">
          <label htmlFor="comment_text">Add a comment:</label>
          <textarea className="form-control" id="comment_text" name="comment_text" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </section>
     
  </div> 
  );
 };

export default EventOverview;
