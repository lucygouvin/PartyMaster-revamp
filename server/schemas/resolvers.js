const { Event, User } = require("../models");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    events: async () => {
      const event = await Event.find().populate({path : "hostID"}).populate({path: "comment", populate:{path: 'userId'}});
      return event;
    },

    event: async (parent, input) => {
      const event = await Event.findById(input.id).populate({path : "hostID"}).populate({path: "comment", populate:{path: 'userId'}});
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
      return event;
    },

    addComment: async (parent, input) => {
      // console.log(input)
      const userId = new mongoose.Types.ObjectId(input.userID._id);
      const user = await User.findById(userId);
console.log("USER")
      console.log(user.name)
      const test = await Event.findById(input.eventID);
      // console.log(test)
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
      ).populate({path : "hostID"}).populate({path: "comment", populate:{path: 'userId'}});
      // console.log("RESULT")
      // console.log(event)
      return event;
    },
  },
};

module.exports = resolvers;
