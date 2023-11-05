const { Schema, model } = require('mongoose');


const commentSchema = new Schema({
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


module.exports = commentSchema;