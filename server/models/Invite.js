const { Schema, Types } = require('mongoose');

const inviteSchema = new Schema({
  inviteId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  invite: {
    type: String,
    required: true,
    default: 'Maybe',
  },

  // need time for comment? maybe add notification?
});

module.exports = inviteSchema;