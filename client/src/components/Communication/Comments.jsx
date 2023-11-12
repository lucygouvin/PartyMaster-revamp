export default function Comment ({comment}){
    return (
        
        <div className="post p-3 rounded bg-light border mb-3 comment-item" key={comment.commentId}>
            <p>by {comment.userId} </p>
            <p>{comment.content}</p>
        </div>
    )
}