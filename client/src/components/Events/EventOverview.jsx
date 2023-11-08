import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../../styles/EventOverview.css'; // Make sure this path is correct

const EventOverview = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the post data
    async function fetchPost() {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post data', error);
      }
    }

    // Fetch the comments data
    async function fetchComments() {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    }

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      // Here you would handle the UI update after deletion
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentText = event.target.comment_text.value;
    try {
      await axios.post(`/api/posts/${postId}/comments`, { comment_text: commentText });
      // Here you would handle the UI update after adding a comment
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <div>
      {post && (
        <section className="post-full mt-5 p-3 rounded bg-white border">
          <h2 className="display-4">{post.title}</h2>
          <p className="text-muted"><small>Author: {post.user.username}</small></p>
          <p className="text-muted"><small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small></p>
          <p>{post.content}</p>

          {post.userCanEdit && (
            <>
              <button onClick={handleDelete} className="btn btn-danger mt-3">
                Delete
              </button>
              <button className="btn btn-warning mt-3 ml-2">
                <a href={`/dashboard/edit/${postId}`} className="text-white">Edit</a>
              </button>
            </>
          )}
        </section>
      )}

      {comments.length > 0 && (
        <section className="mt-5">
          {comments.map((comment) => (
            <div key={comment.id} className="post p-3 rounded bg-light border mb-3">
              <p>by {comment.user.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
              <p>{comment.comment_text}</p>
            </div>
          ))}
        </section>
      )}

      <section className="comment-form mt-5" id="commentForm">
        <form onSubmit={handleCommentSubmit} className="p-3 rounded bg-white border">
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
