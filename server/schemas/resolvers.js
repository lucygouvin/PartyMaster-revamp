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
        return Event.findOne(eventInput).populate('comment');
      }
    },

    getUserEvents: async (parent, _, context) => {
      if (context.user) {
        console.log('REACHED');
        return User.findOne({ _id: context.user._id }).populate('event');
      }
      throw AuthenticationError;
    },

    userRSVP: async (parent, args, context) => {
      console.log("REACHED")
      console.log(args)
      const event = await Event.findById(args._id)
      const rsvps = event.RSVP
      console.log(rsvps)
      const result = rsvps.find(({userId})=> userId.toHexString() ===context.user._id)
      console.log(result)
      return result

    }
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
                RSVP: { userId: guest._id.toHexString(), invite: 'maybe' },
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

    updateEvent: async (parent, eventInput, context) => {
      console.log('REACHED');
      console.log(eventInput);
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

    deleteEvent: async (parent, eventInput, context) =>
      Event.findOneAndDelete({ _id: eventInput }),

    addComment: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user._id);
        return Event.findOneAndUpdate(
          { _id: args._id },
          {
            $addToSet: {
              // TODO include the user's id in the comment object
              comment: {
                userId: context.user.id,
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

    addGuest: async (parent, args, context) => {
      const guest = await User.findOne({ email: args.email });
      return Event.findOneAndUpdate(
        { _id: args.eventId },
        {
          $addToSet: {
            RSVP: { userId: guest._id.toHexString(), invite: 'maybe' },
          },
        },
        { new: true }
      );
    },
    // TODO Add logic for making sure the currenly logged in user owns the event

    removeGuest: async (parent, args, context) =>
      // TODO Add logic for making sure the currenly logged in user owns the event
      Event.findOneAndUpdate(
        { _id: args.eventId },
        { $pull: { RSVP: { userId: args.guestId } } },
        { new: true }
      ),

    updateRSVP: async (parent, args, context) => {
      if (true || context.user) {
        const event = await Event.findOneAndUpdate(
          { _id: args._id, "RSVP.userId":args.RSVP.userId},
        {$set: {"RSVP.$.invite": args.RSVP.invite}}
        );
        return event;
        }

        throw new Error('Not logged in');
      
      
    },

    addContribution: async (parent, args, context) => {
      if (true || context.user) {
        console.log(args.eventId);
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
