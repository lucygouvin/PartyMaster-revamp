import { useContext, useState } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

import Comment from "./Comment";
import EditAddModal from "../Modals/EditAddModal";

import "../../styles/CommentSection.css";

export default function CommentSection({ commentArray }) {
  const { eventId } = useContext(EventContext);

  // State management for add comment modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State management for comment text
  const [commentText, setCommentText] = useState("");

  // MUTATIONS
  const [addComment, { addCommentError }] = useMutation(ADD_COMMENT);
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
        <button onClick={handleOpen} className="cta-button">Add Comment</button>
      </div>
      <div className="comment-list">
        {commentArray.map(function (commentInfo) {
          return <Comment comment={commentInfo} key={commentInfo._id} />;
        })}
      </div>
      <EditAddModal isActive={open} inputType={"textarea"} placeholder={"Enter comment"} value={commentText} onChange={(event) => setCommentText(event.target.value)} onClose={handleClose} onSave={saveAddComment}></EditAddModal>
    </div>
  );
}
