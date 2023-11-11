const { Schema, model } = require('mongoose');

// was giving me a hard tim eif i have it capital, might need to capitalize later
// const userSchema = require('./user');
const contributionSchema = require('./Contribution');
const inviteSchema = require('./Invite');
const commentSchema = require('./Comment');

const eventSchema = new Schema({
  hostID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default:'6549a9520e3f154bdee9dc1b',
  }, // might need hostID?
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
    // scalar.date good to know later
    // date or string is option
  },
  time: {
    // need to allow user to select date, maybe string or have calender option
    type: String,
    required: true,
  },
  location: {
    // stretch goal, add map api
    type: String,
    required: true,
  },
  comment: [commentSchema],
  // sets guest to an array of users in userSchema
  // rename to RSVP?
  RSVP: [inviteSchema],
  potluck: {
    // if false then contribution is not needed for the event!
    type: Boolean,
    required: true,
    default: true,
    // pool of items being brought to the the party
    // have a list of items and have a boolean set to each
    // item while offering users to add other contributions
  },
  // potluckTest: [
  //     contribution, // grabbing it from contributions?
  //     {
  //     type: Boolean
  // }],
  potluckContributions: [
    contributionSchema,
    // split potluck check list with users with those who
    // need to find out how to sort contributions
  ],
  test:{
    type: String,
  }
});

const Event = model('Event', eventSchema);

module.exports = Event;
