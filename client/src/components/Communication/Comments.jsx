import EasyEdit from "react-easy-edit";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT, DELETE_COMMENT } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import "../../styles/CommentForm.css"

export default function Comment({ comment, user, hostID }) {
    const { eventId } = useParams();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const [updateComment, {updateError}] = useMutation(UPDATE_COMMENT)
  const [deleteComment, {deleteError}] = useMutation(DELETE_COMMENT)

  const toggleEditable = () => {
    setEditing(!editing);
  };

  const saveComment = (value) => {
    setContent(value)
    try{
        const {data} = updateComment({
            variables:{
                id: eventId,
                comment: {
                  content: value,
                  commentId: comment.commentId
                }
              }
        })
        toggleEditable()

    }catch(updateError){
        console.error("Unable to update comment", updateError)
    }
  }

  const removeComment = ()=> {
    try {
        const {data} = deleteComment ({
           variables: {
                id: eventId,
                commentId: comment.commentId
              }
        })

    }catch(removeError) {
        console.error("Unable to delete comment",removeError )
    }
window.location.reload()
  }
  return (
    <div
      className="post p-3 rounded bg-light border mb-3 comment-item"
      key={comment.commentId}
    >
      <p>by {comment.userId} </p>
      <EasyEdit
        type="textarea"
        value={content}
        allowEdit={editing}
        onSave={saveComment }
      />
      {comment.userId === user.data._id && (
        <>
        <button className="delete-btn" onClick={removeComment}>Delete</button>
        <button className="edit-btn" onClick={toggleEditable} hidden={editing}>Edit</button>
        </>

      )}
      {comment.userId === user.data._id || user.data._id === hostID && (
        <button onClick={removeComment} >Delete</button>
      )}
    </div>
  );
}
