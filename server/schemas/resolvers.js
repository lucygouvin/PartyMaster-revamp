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
        deleteUser: async (parent, { userID }) => {
            return User.findOneAndDelete({ _id: userID})
        },
        addEvent: async (parent, { Event }, context) => {
            if (context.user) { // needs testing
              const event = new Event({ title, description, date, time, location });
      
              await User.findByIdAndUpdate(context.user.id, {
                $push: { events: event },
              });
      
              return order;
            }
      
            throw new Error("Something has gone wrong!");

        },
        updateEvent: async (parent, { Event }, context) => {

        }
    }
}

module.exports = resolvers