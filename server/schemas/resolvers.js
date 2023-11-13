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

    getEventData: async (parent, eventInput, context) => {
      if (context.user) {
        return Event.findOne(eventInput).populate('comment', 'user');
      }
    },

    getUserEvents: async (parent, _, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('event');
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
      if (context.user) {
        return User.findOneAndDelete({ _id: userID });
      }

      throw AuthenticationError;
    },

    addEvent: async (parent, eventInput, context) => {
      if (context.user) {
        const event = await Event.create({
          hostID: context.user._id,
          title: eventInput.title,
          description: eventInput.description,
          date: eventInput.date,
          time: eventInput.time,
          location: eventInput.location,
        });

        const guestArray = eventInput.guestList.split(',');

        guestArray.forEach(async (invitee) => {
          invitee.trim();
          const guest = await User.findOne({ email: invitee });
          await Event.findOneAndUpdate(
            { _id: event._id },
            {
              $addToSet: {
                RSVP: { userId: guest._id.toHexString(), invite: 'Maybe' },
              },
            },
            { new: true }
          );

          await User.findByIdAndUpdate(guest._id.toHexString(), {
            $push: { event: event._id },
          });
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { event: event._id },
        });

        return event;
      }

      throw AuthenticationError;
    },

    updateEvent: async (parent, args, context) => {
      if (context.user || true) {
        const event = await Event.findOneAndUpdate(
          { _id: args._id },
          {
            $set: args,
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

    deleteEvent: async (parent, eventInput) => {
      Event.findOneAndDelete({ _id: eventInput });
    },

    addComment: async (parent, args, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args._id },
          {
            $addToSet: {
              // TODO include the user's id in the comment object
              comment: {
                userId: context.user._id,
                content: args.comment.content,
              },
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

    addGuest: async (parent, args) => {
      const guest = await User.findOneAndUpdate({ email: args.email },
        {
          $push: { event: args.eventId },
        });
      return Event.findOneAndUpdate(
        { _id: args.eventId },
        {
          $addToSet: {
            RSVP: { userId: guest._id.toHexString(), invite: 'Maybe' },
          },
        },
        { new: true }
      );
    },

    removeGuest: async (parent, args) => {
    await User.findOneAndUpdate({_id:args.guestId},
      {$pull:{ event: args.eventId }});
    return Event.findOneAndUpdate(
        { _id: args.eventId },
        { $pull: { RSVP: { userId: args.guestId } } },
        { new: true }
      );
    },

    updateRSVP: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.findOneAndUpdate(
          { _id: args._id, 'RSVP.userId': args.RSVP.userId },
          { $set: { 'RSVP.$.invite': args.RSVP.invite } },
          {new: true}
        );
        return event;
      }

      throw new Error('Not logged in');
    },

    addContribution: async (parent, args, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventId },
          {
            $addToSet: {
              potluckContributions: {
                item: args.contribution.item,
              },
            },
          },
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },
    claimContribution: async (parent, args, context) => {
      if (true||context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventId, "potluckContributions._id":args.contribution._id },
          {$set: {"potluckContributions.$.name": context.user.name}},
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },
    deleteContribution: async (parent, args, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventId },
          { $pull: { contribution: { item: args.contribution.item } } },
          { new: true }
        );
      }
      throw new Error('Not logged in');
    },

    updateComment: async (parent, args) => {
      return Event.findOneAndUpdate(
        {_id: args._id, "comment.commentId": args.comment.commentId},
        {$set: {"comment.$.content": args.comment.content}},
        {new: true}
      );
    }
  },
};

module.exports = resolvers;
