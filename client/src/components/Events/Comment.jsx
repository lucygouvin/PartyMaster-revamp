import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT, DELETE_COMMENT } from "../../utils/mutations";

export default function Comment({ comment }) {
  const { eventId } = useContext(EventContext);
  const { user } = useContext(EventContext);

  const isAuthor = user._id === comment.userId._id;

  const [editComment, { editCommentError }] = useMutation(EDIT_COMMENT);
  const [deleteComment, { deleteCommentError }] = useMutation(DELETE_COMMENT);

  const saveEditComment = () => {
    try {
      const { data } = editComment({
        variables: {
          eventId,
          comment: {
            _id: "65b52e27a561cafa0b6b5b2e",
            content: "Edited child component",
          },
        },
      });
    } catch (editCommentError) {
      console.error("Unable to edit comment", editCommentError);
    }
  };

  const saveDeleteComment = () => {
    try {
      const { data } = deleteComment({
        variables: {
          eventId,
          commentId: "65b52e27a561cafa0b6b5b2e",
        },
      });
    } catch (deleteCommentError) {
      console.error("Unable to delete comment", deleteCommentError);
    }
  };

  return (
    <div className="comment-item">
      <p>
        {comment.userId.name || comment.userId.email}, {comment.content}
      </p>
      {isAuthor ? (
        <>
          <button onClick={saveEditComment}>Edit Comment</button>
        </>
      ) : (
        <></>
      )}
      {isAuthor || isHost ? (
        <>
          <button onClick={saveDeleteComment}>Delete Comment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
