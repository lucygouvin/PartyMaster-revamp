const { Schema } = require('mongoose');

const inviteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  invite: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    required: true,
    default: 'maybe',
  },
  // notified: { A boolean to check if a user has been notified or not, stretch goal
  //     type: Boolean,
  //     default: false
  // }

  // need time for comment? maybe add notification?
});

module.exports = inviteSchema;
