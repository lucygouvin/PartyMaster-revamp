const mongoose = require("mongoose");
const { Event, User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // EVENT QUERIES
    events: async () => {
      const event = await Event.find()
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId" } });
      return event;
    },

    event: async (parent, args) => {
      const event = await Event.findById(args.id)
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId" } });
      return event;
    },

    // USER QUERIES
    users: async () => {
      const users = await User.find();
      return users;
    },

    user: async (parent, args) => {
      const user = await User.findById(args.id);
      return user;
    },

    // TODO: getUserEvents
  },

  Mutation: {
    // USER MUTATIONS

    addUser: async (parent, args) => {
      console.log("REACHED");
      console.log(args);
      // If this mutation was called from /signup, then sign the user in automatically
      const login = args.params === "signup";
      const user = await User.create({
        name: args.name,
        email: args.email,
        password: args.password,
        prevSignIn: login,
      });
      console.log(user);
      if (login) {
        const token = signToken(user);
        return { token, user };
      } else {
        return { user };
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const validatePw = await user.isCorrectPassword(password);

      if (!validatePw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    // TODO: Log in
    // TODO: Delete user
    // TODO Stretch: Edit user
    // TODO: Delete comment
    // TODO: Edit comment
    // TODO Stretch: Delete contrib
    // TODO Stretch: Edit contrib
    // TODO: Update event
    // TODO: Delete event
    // TODO: Add guest
    // TODO: Remove guest
    // TODO: Update RSVP

    addEvent: async (parent, args) => {
      const id = new mongoose.Types.ObjectId(args.hostID._id);
      const user = await User.findById(id);
      const event = await Event.create({
        hostID: user,
        title: args.title,
        description: args.description,
        date: args.date,
        time: args.time,
        location: args.location,
      });

      const guestArray = args.guestList.split(",");

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

    addComment: async (parent, args) => {
      const userId = new mongoose.Types.ObjectId(args.userID._id);
      const user = await User.findById(userId);
      const event = await Event.findOneAndUpdate(
        { _id: args.eventID },
        {
          $addToSet: {
            comment: {
              userId: user,
              content: args.content.content,
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

    addContribution: async (parent, args) => {
      const user = await User.findById(args.userID);
      const event = await Event.findOneAndUpdate(
        { _id: args.eventID },
        {
          $addToSet: {
            contribution: {
              userId: user,
              item: args.contribution.item,
            },
          },
        },
        { new: true }
      )
        .populate({ path: "hostID" })
        .populate({ path: "comment", populate: { path: "userId" } })
        .populate({ path: "RSVP", populate: { path: "userId" } })
        .populate({ path: "contribution", populate: { path: "userId" } });
      return event;
    },
  },
};

module.exports = resolvers;
