import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT, DELETE_COMMENT } from "../../utils/mutations";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import'../../styles/Comment.css'

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

export default function Comment({ comment }) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);

  const isAuthor = user._id === comment.userId._id;

  const [editComment, { editCommentError }] = useMutation(EDIT_COMMENT);
  const [deleteComment, { deleteCommentError }] = useMutation(DELETE_COMMENT);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditCommentText(commentText);
  }

  const [commentText, setCommentText] = useState(comment.content);
  const [editCommentText, setEditCommentText] = useState(commentText);


  const saveEditComment = () => {
    try {
      const { data } = editComment({
        variables: {
          eventId,
          comment: {
            _id: comment._id,
            content: editCommentText,
          },
        },
      });
    } catch (editCommentError) {
      console.error("Unable to edit comment", editCommentError);
    }
    setCommentText(editCommentText)
    setEditCommentText("");
    handleClose();
    
  };

  const saveDeleteComment = () => {
    try {
      const { data } = deleteComment({
        variables: {
          eventId,
          commentId: comment._id,
        },
      });
    } catch (deleteCommentError) {
      console.error("Unable to delete comment", deleteCommentError);
    }
  };

  return (
    <div className="container comment-item" data-comment-id={comment._id}>
      <p className="comment-author">
        {comment.userId.name || comment.userId.email} 
      </p>
      <p className="comment-content">{commentText}</p>
      <div className="comment-button-group">
       {isAuthor || isHost ? (
        <>
          <button className="button delete-button delete-comment-button" onClick={saveDeleteComment}>Delete</button>
        </>
      ) : (
        <></>
      )}
      {isAuthor ? (
        <>
          <button className="button edit-button edit-comment-button" onClick={handleOpen}>Edit</button>
        </>
      ) : (
        <></>
      )} 
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="comment-flex-group">
          <Box sx={style}>
            <label htmlFor="comment_text">Edit comment:</label>
            <textarea
              className="form-control"
              id="comment_text"
              name="comment_text"
              rows="3"
              placeholder="Enter comment"
              value={editCommentText}
              required
              onChange={(event) => setEditCommentText(event.target.value)}
            ></textarea>
            <div className="comment-button-group">
              <button className="cancel-button" onClick={handleClose}>Cancel</button>
              <button className="cta-button" onClick={saveEditComment}>Save</button>
            </div>
          </Box>
        </div>
      </Modal>
      
      
    </div>
  );
}
