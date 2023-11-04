const { Schema, model } = require('mongoose');


const commentSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }

    // need time for comment? maybe add notification? 
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;