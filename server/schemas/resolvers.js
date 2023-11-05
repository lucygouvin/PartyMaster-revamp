const { Event, User, Comment } = require('../models');
// auth 

const resolvers = {
  Query: {

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
      if (context.user)
        return User.findOneAndDelete({ _id: userID })

      throw new Error("Something has gone wrong!");
    },
    addEvent: async (parent, { eventInput }, context) => {
      if (context.user) { // needs testing
        const event = await Event.create(eventInput);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { events: event._id },
        });

        return event;
      }

      throw new Error("Something has gone wrong!");

    },
    updateEvent: async (parent, { eventInput }, context) => {
      if (context.user) {
        const event = await Event.findOneAndUpdate({ _id: eventInput._id },
          {
            $set: eventInput
          },
          {
            runValidators: true,
            new: true,
          }
        )
        return event;
      }
      throw new Error("Not logged in");
    }
  }
}

module.exports = resolvers