const { Schema, model } = require("mongoose");
const User = require("./User");
const commentSchema = require("./Comment");
const inviteSchema = require("./Invite")

const eventSchema = new Schema(
  {
    hostID: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    comment: [commentSchema],
    RSVP: [inviteSchema],
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);

module.exports = Event;
