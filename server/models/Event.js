const { Schema, model } = require('mongoose');

// was giving me a hard tim eif i have it capital, might need to capitalize later
// const userSchema = require('./user');

const eventSchema = new Schema({
    hostID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, //might need hostID?
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        // need to allow user to select date, maybe string or have calender option
        type: Date,
    },
    location: {
        // stretch goal, add map api 
        type: String,
    },
    // sets guest to an array of users in userSchema
    // rename to RSVP? 
    guest: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    potluck: {
        type: Boolean
        // pool of items being brought to the the party
        // have a list of items and have a boolean set to each 
        // item while offering users to add other contributions
    },
    contribution: [
        {// split potluck check list with users with those who 
            // need to find out how to sort contributions
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            item:{
                type: String
            }
        }]
});

const Event = model("Event", eventSchema);

module.exports = Event;