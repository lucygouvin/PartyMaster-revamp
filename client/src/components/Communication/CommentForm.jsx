import { useMutation } from "@apollo/client";
import { useState} from 'react';
import { ADD_COMMENT } from "../../utils/mutations";

export default function CommentForm ({eventId}){
    const [addComment, {error}] = useMutation(ADD_COMMENT)
    const [commentText, setCommentText] = useState('')


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
    return (
        <section className="comment-form" id="commentForm">
        <form onSubmit={handleCommentSubmit} className="p-3 rounded bg-white border">
          <div className="form-group">
            <label htmlFor="comment_text">Add a comment:</label>
            <textarea className="form-control" id="comment_text" name="comment_text" rows="3" resize= "none" value={commentText} required onChange={(event)=> setCommentText(event.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    )
}