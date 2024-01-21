const { Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = commentSchema;
