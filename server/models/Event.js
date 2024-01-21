const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const inviteSchema = require('./Invite');
const contributionSchema = require('./Contribution');

const eventSchema = new Schema(
  {
    hostID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // default: '65933a0e32a8085eda2a3516',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    comment: [commentSchema],
    RSVP: [inviteSchema],
    potluck: {
      type: Boolean,
      required: true,
      default: true,
    },
    contribution: [contributionSchema],
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
// TODO: Consider reworking with virtuals to move calculation to server
eventSchema.virtual('rsvpMaybe').get(function () {
  return this.RSVP.filter((rsvp) => rsvp.invite === 'Maybe');
});
eventSchema.virtual('rsvpYes').get(function () {
  return this.RSVP.filter((rsvp) => rsvp.invite === 'Yes');
});
eventSchema.virtual('rsvpNo').get(function () {
  return this.RSVP.filter((rsvp) => rsvp.invite === 'No');
});
eventSchema.virtual('rsvpNotResponded').get(function () {
  return this.RSVP.filter((rsvp) => rsvp.invite === 'Not Responded');
});
eventSchema.virtual('guestNumber').get(function () {
  return this.RSVP.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;
