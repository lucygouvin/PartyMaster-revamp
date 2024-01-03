const { Event, User } = require("../models");
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    events: async () => {
      const test = await Event.find().populate("hostID");

      console.log(test[3]);
      return test;
    },

    event: async(parent, input) => {
      const event = await Event.findById(input.id).populate("hostID")
      return event
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
      console.log(input)
      console.log(input.hostID._id)
      const id = new mongoose.Types.ObjectId(input.hostID._id)
      console.log(typeof id)
      const user = await User.findById(id)
      const event = await Event.create({
        hostID: user,
        title: input.title,
        description: input.description,
        date: input.date,
        time: input.time,
        location: input.location,

      })
      return event
    }
  }
};

module.exports = resolvers;
