const { Event, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// TODO remove || true once auth stuff is added

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

    // getEventData: async (parent, eventInput, context) => {
    // if(context.user){
    //   return Event.findOne(eventInput).populate('comment');
    // // }
    //   }
    // },


    getUserEvents: async (parent, _, context) => {
      if (context.user) {
        User.findOne({ _id: context.user._id }).populate('event');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
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
    deleteUser: async (parent, { userID }, context) => {
      // TODO remove || true once auth stuff is added
      if (context.user || true) {
        return User.findOneAndDelete({ _id: userID });
      }

      throw AuthenticationError;
    },

    addEvent: async (parent, eventInput, context) => {
      if (context.user || true) {
        const event = await Event.create(eventInput);
        // TODO Add the event to the user's list

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
      // TODO check to see if the event's creator is the current user.
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
              // TODO include the user's id in the comment object
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

    deleteComment: async (parent, args, context) => {
      // TODO check to see if the logged in user wrote the comment
      if (true || context.user) {
        return Event.findOneAndUpdate(
          { _id: args._id },
          { $pull: { comment: { commentId: args.commentId } } },
          { new: true }
        );
      }
      throw new Error('Not your comment');
    },

    addGuest: async (parent, args, context) =>
      // TODO Add logic for making sure the currenly logged in user owns the event
      Event.findOneAndUpdate(
        { _id: args.eventId },
        { $addToSet: { RSVP: { userId: args.guestId, invite: 'maybe' } } },
        { new: true }
      ),
    removeGuest: async (parent, args, context) =>
      // TODO Add logic for making sure the currenly logged in user owns the event
      Event.findOneAndUpdate(
        { _id: args.eventId },
        { $pull: { RSVP: { userId: args.guestId } } },
        { new: true }
      ),

    updateRSVP: async (parent, args, context) => {
      console.log(args);
      console.log(args.RSVP.invite);
      if (true || context.user) {
        return Event.findOneAndUpdate(
          { _id: args._id, 'RSVP.userId': args.RSVP.userId },
          { $set: { 'RSVP.$.invite': args.RSVP.invite } },
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },

    addContribution: async (parent, args, context) => {
      if (true || context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventId },
          {
            $addToSet: {
              contribution: {
                userId: args.contribution.userId,
                item: args.contribution.item,
              },
            },
          },
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },
    // Not sure if this needs to be its own function or if it should be part of updateEvent?
    deleteContribution: async (parent, args, context) => {
      // TODO Add logic to see if the signed in user is the host
      // TODO Add an id to contributions, make them their own schema
      if (true || context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventId },
          { $pull: { contribution: { item: args.contribution.item } } },
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },
  },
};

module.exports = resolvers;
