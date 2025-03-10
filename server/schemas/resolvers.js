const { Event, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // EVENT QUERIES
    events: async () => {
      const event = await Event.find()
        .populate({ path: 'hostID' })
        .populate({ path: 'comment', populate: { path: 'userId' } })
        .populate({ path: 'RSVP', populate: { path: 'userId' } })
        .populate({ path: 'contribution', populate: { path: 'userId' } });
      return event;
    },

    event: async (parent, args) => {
      const event = await Event.findById(args.id)
        .populate({ path: 'hostID' })
        .populate({ path: 'comment', populate: { path: 'userId' } })
        .populate({ path: 'RSVP', populate: { path: 'userId' } })
        .populate({ path: 'contribution', populate: { path: 'userId' } });
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

    userEvents: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate({
          path: 'event',
          populate: { path: 'hostID' },
        }).populate({
          path: 'event',
          populate: { path: 'RSVP.userId' },
        });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // USER MUTATIONS
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

    addUser: async (parent, args) => {
      let token
      // If this mutation was called from /signup, then sign the user in automatically
      const user = await User.create({
        name: args.name,
        email: args.email,
        password: args.password,
        prevSignIn: args.login,
      });
      if (args.login) {
        token = signToken(user);
      }
      return { token, user };
    },

    deleteUser: async (parent, args) => User.findOneAndDelete({ _id: args.id }),

    // TODO Stretch: Edit user

    // EVENT MUTATIONS

    addEvent: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const event = await Event.create({
          hostID: user._id,
          title: args.title,
          description: args.description,
          date: args.date,
          startTime: args.startTime,
          endTime: args.endTime,
          time: args.time,
          location: args.location,
          // Add host to RSVP list, set as "Yes"
          RSVP: {
            userId: user,
            invite: 'Yes',
          },
        });

        const guestArray = args.guestList.split(',');

        guestArray.forEach(async (invitee) => {
          invitee.trim();
          // If the guest is a user, add this event to their list
          const guest = await User.findOneAndUpdate(
            { email: invitee },
            { $push: { event: event._id } },
            // If the user does not exist, create them, and add the event to their list
            { upsert: true, new: true }
          );
          // Add each invitee to the event's RSVP list. Set as "Not Responded"
          await Event.findOneAndUpdate(
            { _id: event._id },
            {
              $addToSet: {
                RSVP: {
                  userId: guest._id,
                  invite: 'Not Responded',
                },
              },
            },
            { new: true }
          );
        });

        return event;
      }
    },

    editEvent: async (parent, args) => {
      const event = await Event.findOneAndUpdate(
        { _id: args._id },
        {
          $set: args,
        },
        {
          runValidators: true,
          new: true,
        }
      )
        .populate({ path: 'hostID' })
        .populate({ path: 'comment', populate: { path: 'userId' } })
        .populate({ path: 'RSVP', populate: { path: 'userId' } });
      return event;
    },

    deleteEvent: async (parent, args) =>
      Event.findOneAndDelete({ _id: args.id }),

    // GUEST MUTATIONS
    addGuest: async (parent, args) => {
      // Assume data was sanitized on the front end, one user

      // If the guest is a user, add this event to their list
      const guest = await User.findOneAndUpdate(
        { email: args.guests },
        { $addToSet: { event: args.eventId } },
        // If the user does not exist, create them, and add the event to their list
        { upsert: true, new: true }
      );

      return Event.findOneAndUpdate(
        { _id: args.eventId },
        {
          $addToSet: {
            RSVP: { userId: guest._id },
          },
        },
        { new: true }
      ).populate({ path: 'RSVP', populate: { path: 'userId' } });
    },

    deleteGuest: async (parent, args) => {
      const user = await User.findOneAndUpdate(
        { _id: args.guestId },
        { $pull: { event: args.eventId } }
      );

      const event = await Event.findOneAndUpdate(
        { _id: args.eventId },
        { $pull: { RSVP: { userId: user._id } } },
        { new: true }
      ).populate({ path: 'RSVP', populate: { path: 'userId' } });

      return event;
    },

    // COMMENT MUTATIONS
    addComment: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const event = await Event.findOneAndUpdate(
          { _id: args.eventID },
          {
            $addToSet: {
              comment: {
                userId: user,
                content: args.content,
              },
            },
          },
          { new: true }
        )
          // TODO Do we need to do all these populations?

          .populate({ path: 'comment', populate: { path: 'userId' } });
        return event;
      }
    },

    deleteComment: async (parent, args) =>
      Event.findOneAndUpdate(
        { _id: args.eventId },
        { $pull: { comment: { _id: args.commentId } } },
        { new: true }
      ).populate({ path: 'comment', populate: { path: 'userId' } }),

    editComment: async (parent, args) =>
      Event.findOneAndUpdate(
        { _id: args.eventId, 'comment._id': args.comment._id },
        { $set: { 'comment.$.content': args.comment.content } },
        { new: true }
      ).populate({ path: 'comment', populate: { path: 'userId' } }),

    // CONTRIBUTION MUTATIONS

    addContribution: async (parent, args) => {
      let user = null;
      if (args.userID) {
        user = await User.findById(args.userID);
      }
      const event = await Event.findOneAndUpdate(
        { _id: args.eventID },
        {
          $addToSet: {
            contribution: {
              userId: user,
              item: args.contribution,
            },
          },
        },
        { new: true }
      ).populate({ path: 'contribution', populate: { path: 'userId' } });
      return event;
    },

    claimContribution: async (parent, args, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventID, 'contribution._id': args.contributionID },
          { $set: { 'contribution.$.userId': context.user._id } },
          { new: true }
        ).populate({ path: 'contribution', populate: { path: 'userId' } });
      }
    },

    deleteContribution: async (parent, args) =>
      Event.findOneAndUpdate(
        { _id: args.eventID },
        { $pull: { contribution: { _id: args.contributionID } } },
        { new: true }
      ).populate({ path: 'contribution', populate: { path: 'userId' } }),

    editContribution: async (parent, args) =>
      Event.findOneAndUpdate(
        { _id: args.eventID, 'contribution._id': args.contributionID },
        { $set: { 'contribution.$.item': args.item } },
        { new: true }
      ).populate({ path: 'contribution', populate: { path: 'userId' } }),

    unclaimContribution: async (parent, args, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventID, 'contribution._id': args.contributionID },
          { $set: { 'contribution.$.userId': null } },
          { new: true }
        ).populate({ path: 'contribution', populate: { path: 'userId' } });
      }
    },

    // RSVP MUTATIONS
    setRSVP: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: args.eventID, 'RSVP.userId': context.user._id },
          { $set: { 'RSVP.$.invite': args.rsvp } },
          { new: true }
        ).populate({ path: 'RSVP', populate: { path: 'userId' } });
      }
    },
  },
};

module.exports = resolvers;
