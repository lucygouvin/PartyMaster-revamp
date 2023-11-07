const { Event, User, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    events: async () => Event.find(),

    users: async () => User.find(),

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    getEventData: async (parent, { eventInput }) =>
      Event.findOne({ _id: eventInput._id }),

    getUserEvents: async (parent, _, context) => {
      if (context.user) {
        User.findOne({ _id: context.user._id }).populate('event');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      console.log(newUser);

      return { token, newUser };
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
    deleteUser: async (parent, userID, context) => {
      // TODO remove || true once auth stuff is added
      if (context.user || true) {
        return User.findOneAndDelete({ _id: userID });
      }

      throw AuthenticationError;
    },

    addEvent: async (parent, eventInput, context) => {
      if (context.user || true) {
        console.log(context);
        console.log(eventInput);
        // needs testing
        const event = await Event.create(eventInput);

        // await User.findByIdAndUpdate(context.user._id, {
        //   $push: { events: event._id },
        // });

        return event;
      }

      throw AuthenticationError;
    },

    updateEvent: async (parent, eventInput, context) => {
      if (context.user || true) {
        const event = await Event.findOneAndUpdate(
          { _id: eventInput._id },
          {
            $set: eventInput,
          },
          {
            runValidators: true,
            new: true,
          }
        );
        return event;
      }
      throw AuthenticationError;
    },

    deleteEvent: async (parent, eventInput, context) => {
      if (true || context.user._id === eventInput.hostID) {
        return Event.findOneAndDelete({ _id: eventInput });
      }
      throw AuthenticationError;
    },

    addComment: async (parent, args, context) => {
      if (context.user || true) {
        return Event.findOneAndUpdate(
          { _id: args._id },
          {
            $addToSet: {
              comment: { content: args.comment.content },
            },
          },
          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },

    // deleteComment: async (parent, { eventInput, commentInput }, context) => {
    //   if (context.user === commentInput.userId) {
    //     return Event.findOneAndUpdate(
    //       { _id: eventInput._id },
    //       { $pull: { comment: { _id: commentInput._id } } }
    //     );
    //   }
    //   throw new Error('Not your comment');
    // },

    // updateRSVP: async (parent, { eventInput, rsvpInput }, context) => {
    //   if (context.user) {
    //     return Event.findOneAndUpdate(
    //       { _id: eventInput._id, 'RSVP.userId': context.user._id },
    //       { $set: { 'RSVP.$.invite': rsvpInput } }
    //     );
    //   }
    //   throw new Error('Not logged in');
    // },

    // addContribution: async (
    //   parent,
    //   { eventInput, contributionInput },
    //   context
    // ) => {
    //   if (context.user) {
    //     return Event.findOneAndUpdate(
    //       { _id: eventInput._id },
    //       { $addToSet: { contribution: { item: contributionInput } } }
    //     );
    //   }
    //   throw new Error('Not logged in');
    // },
    // // Not sure if this needs to be its own function or if it should be part of updateEvent?
    // deleteContribution: async (
    //   parent,
    //   { eventInput, contributionInput },
    //   context
    // ) => {
    //   if (context.user) {
    //     return Event.findOneAndUpdate(
    //       { _id: eventInput._id },
    //       // Note: if there are two items with the same name, this may delete the wrong one. it would be more robust to have an id for each contribution. Maybe have a contributionSchema?
    //       { $pull: { contribution: { item: contributionInput } } }
    //     );
    //   }
    //   throw new Error('Not logged in');
    // },
  },
};

module.exports = resolvers;
