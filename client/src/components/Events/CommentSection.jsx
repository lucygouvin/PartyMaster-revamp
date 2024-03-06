import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

import Comment from "./Comment";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "../../styles/CommentSection.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "border-radius": "15px",
};

export default function CommentSection({ commentArray }) {
  const { eventId } = useContext(EventContext);

  const [addComment, { addCommentError }] = useMutation(ADD_COMMENT);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [commentText, setCommentText] = useState("");

  const saveAddComment = () => {
    try {
      const { data } = addComment({
        variables: {
          eventId,
          content: commentText,
        },
      });
    } catch (addCommentError) {
      console.error("Unable to add comment", addCommentError);
    }
    setCommentText("");
    handleClose();
  };

  return (
    <div className="group comment-group">
      <div className="flex-group">
        <h2>Comments</h2>
        <button onClick={handleOpen}>Add Comment</button>
      </div>
      <div className="comment-list">
        {commentArray.map(function (commentInfo) {
          return <Comment comment={commentInfo} key={commentInfo._id} />;
        })}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="comment-flex-group">
          <Box sx={style}>
            <label htmlFor="comment_text">Add comment:</label>
            <textarea
              className="form-control"
              id="comment_text"
              name="comment_text"
              rows="3"
              placeholder="Enter comment"
              value={commentText}
              required
              onChange={(event) => setCommentText(event.target.value)}
            ></textarea>
            <div className="comment-button-group">
              <button className="cancel-button" onClick={handleClose}>Cancel</button>
              <button className="cta-button" onClick={saveAddComment}>Save</button>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
