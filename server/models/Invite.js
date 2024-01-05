const { Schema } = require('mongoose');

const inviteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    invite: {
      type: String,
      enum: ['Yes', 'No', 'Maybe', 'Not Responded'],
      required: true,
      default: 'Not Responded',
    },

    // need time for comment? maybe add notification?
  },
  { timestamps: true }
);

module.exports = inviteSchema;
