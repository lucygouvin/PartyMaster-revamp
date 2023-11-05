const { Event, User, Comment } = require('../models');
// auth

const resolvers = {

  Query: {
    getEventData: async (parent, { eventInput }) =>
      Event.findOne({ _id: eventInput._id }),

    getUserEvents: async (parent, _, context) =>
      User.findOne({ _id: context.user._id }).populate('event'),
  },

  Mutation: {
    // addUser: async (parent, args) => {
    //     const user = await User.create(args);

    //     return { user };
    // },
    // login: async ( parent, { email, password }) => {
    //     const user = await User.findOne({ email });

    //     if (!user) {
    //         throw console.log("error");
    //     }
    //     // need auth
    // },
    deleteUser: async (parent, { userID }, context) => {
      if (context.user) return User.findOneAndDelete({ _id: userID });

      throw new Error('Something has gone wrong!');
    },

    addEvent: async (parent, { eventInput }, context) => {
      if (context.user) {
        // needs testing
        const event = await Event.create(eventInput);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { events: event._id },
        });

        return event;
      }

      throw new Error('Something has gone wrong!');
    },

    updateEvent: async (parent, { eventInput }, context) => {
      if (context.user) {
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
<<<<<<<<< Temporary merge branch 1
      throw new Error('Not logged in');
    },
  },
};
=========
      throw new Error("Not logged in");
    },

    deleteEvent: async (parent, { eventInput }, context) => {
      if (context.user._id === eventInput.hostID) {
        return Event.findOneAndDelete({ _id: eventInput._id });
      }
      throw new Error('The user is not the host');
    },

    addComment: async (parent, { eventInput, commentInput }, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventInput._id },
          {
            $addToSet: {
              comment: { userId: contex.user._id, content: commentInput },
            },
          }
        );
      }
      throw new Error('Not logged in');
    },

    deleteComment: async (parent, { eventInput, commentInput }, context) => {
      if (context.user === commentInput.userId) {
        return Event.findOneAndUpdate(
          { _id: eventInput._id },
          { $pull: { comment: { _id: commentInput._id } } }
        );
      }
      throw new Error('Not your comment');
    },

    updateRSVP: async (parent, { eventInput, rsvpInput }, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventInput._id, 'RSVP.userId': context.user._id },
          { $set: { 'RSVP.$.invite': rsvpInput } }
        );
      }
      throw new Error('Not logged in');
    },

    addContribution: async (
      parent,
      { eventInput, contributionInput },
      context
    ) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventInput._id },
          { $addToSet: { contribution: { item: contributionInput } } }
        );
      }
      throw new Error('Not logged in');
    },
    // Not sure if this needs to be its own function or if it should be part of updateEvent?
    deleteContribution: async (
      parent,
      { eventInput, contributionInput },
      context
    ) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventInput._id },
          // Note: if there are two items with the same name, this may delete the wrong one. it would be more robust to have an id for each contribution. Maybe have a contributionSchema?
          { $pull: { contribution: { item: contributionInput } } }
        );
      }
      throw new Error('Not logged in');
    },

    

  }
}
>>>>>>>>> Temporary merge branch 2

module.exports = resolvers;
