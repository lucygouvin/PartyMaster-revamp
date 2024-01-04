const mongoose = require("mongoose");
const { Event, User } = require("../models");

const resolvers = {
  Query: {
    events: async () => {
      const event = await Event.find()
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId"}});
      return event;
    },

    event: async (parent, input) => {
      const event = await Event.findById(input.id)
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId"}});
      return event;
    },

    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (parent, input) => {
      const user = await User.findById(input.id);
      return user;
    },
  },

  Mutation: {
    addEvent: async (parent, input) => {
      const id = new mongoose.Types.ObjectId(input.hostID._id);
      const user = await User.findById(id);
      const event = await Event.create({
        hostID: user,
        title: input.title,
        description: input.description,
        date: input.date,
        time: input.time,
        location: input.location,
      });

      const guestArray = input.guestList.split(",");

      guestArray.forEach(async (invitee) => {
        invitee.trim();
        const guest = await User.findOne({ email: invitee });
        await Event.findOneAndUpdate(
          { _id: event._id },
          {
            $addToSet: {
              RSVP: {
                userId: guest,
                invite: "Not Responded",
              },
            },
          },
          { new: true }
        );
        // TODO: Add to a guest and host event lists on the User model
      });

      return event;
    },

    addComment: async (parent, input) => {
      const userId = new mongoose.Types.ObjectId(input.userID._id);
      const user = await User.findById(userId);
      const event = await Event.findOneAndUpdate(
        { _id: input.eventID },
        {
          $addToSet: {
            comment: {
              userId: user,
              content: input.content.content,
            },
          },
        },
        { new: true }
      )
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } });
      return event;
    },

    addContribution: async (parent, input) => {
      const user = await User.findById(input.userID);
      const event = await Event.findOneAndUpdate(
        { _id: input.eventID },
        {
          $addToSet: {
            contribution: {
              userId: user,
              item: input.contribution.item,
            },
          },
        },
        { new: true }
      )
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId"}});
      return event;
    },
  },
};

module.exports = resolvers;
