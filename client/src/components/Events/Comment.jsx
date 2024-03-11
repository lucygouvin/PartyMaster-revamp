import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT, DELETE_COMMENT } from "../../utils/mutations";

import ConfirmDeleteModal from "../Modals/ConfirmDelete";
import EditAddModal from "../Modals/EditAddModal";

import "../../styles/Comment.css";

export default function Comment({ comment }) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);

  const isAuthor = user._id === comment.userId._id;

  // State management for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditCommentText(commentText);
  };

  // State management for delete modal
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = () => setDelOpen(true);
  const handleDelClose = () => setDelOpen(false);

  // State management for comment text and the edited text
  const [commentText, setCommentText] = useState(comment.content);
  const [editCommentText, setEditCommentText] = useState(commentText);

  // MUTATIONS
  const [editComment, { editCommentError }] = useMutation(EDIT_COMMENT);
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
    setCommentText(editCommentText);
    setEditCommentText("");
    handleClose();
  };

  const [deleteComment, { deleteCommentError }] = useMutation(DELETE_COMMENT);
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
        {/* Display author's username, or if there is none, their email */}
        {comment.userId.name || comment.userId.email}
      </p>
      <p className="comment-content">{commentText}</p>
      <div className="comment-button-group">
        {/* Show delete button if the logged in user is the event host, or the comment's author */}
        {isAuthor || isHost ? (
          <>
            <button
              className="button delete-button delete-comment-button"
              onClick={handleDelOpen}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
        {/* Show edit button if the logged in user is the comment's author */}
        {isAuthor ? (
          <>
            <button
              className="button edit-button edit-comment-button"
              onClick={handleOpen}
            >
              Edit
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <EditAddModal
        inputType={"textarea"}
        isActive={open}
        placeholder={"Enter comment"}
        value={editCommentText}
        onChange={(event) => setEditCommentText(event.target.value)}
        title={"Edit comment"}
        onClose={handleClose}
        onSave={saveEditComment}
      ></EditAddModal>

      <ConfirmDeleteModal
        title={"Are you sure you want to delete this comment?"}
        isActive={delOpen}
        onClose={handleDelClose}
        onDelete={saveDeleteComment}
      ></ConfirmDeleteModal>
    </div>
  );
}
