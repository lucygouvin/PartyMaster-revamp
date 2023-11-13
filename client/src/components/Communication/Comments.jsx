import EasyEdit from "react-easy-edit";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "../../utils/mutations";
import { useParams } from "react-router-dom";


export default function Comment({ comment, user }) {
    const { eventId } = useParams();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const [updateComment, {updateError}] = useMutation(UPDATE_COMMENT)

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
        <button onClick={toggleEditable} hidden={editing}>Edit</button>
        </>
      )}
    </div>
  );
}
