import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

import Comment from "./Comment";

export default function CommentSection({ commentArray }) {
  const eventId = useContext(EventContext);

  const [addComment, { addCommentError }] = useMutation(ADD_COMMENT);

  const saveAddComment = () => {
    try {
      const { data } = addComment({
        variables: {
          eventId,
          content: "Content from child component",
        },
      });
    } catch (addCommentError) {
      console.error("Unable to add comment", addCommentError);
    }
  };

  return (
    <div className="group comment-group">
      <h2>Comments</h2>
      <button onClick={saveAddComment}>Add Comment</button>
      <div className="comment-list">
        {commentArray.map(function (commentInfo) {
          return <Comment comment={commentInfo} />;
        })}
      </div>
    </div>
  );
}
