const typeDefs = `
 type Event {
    _id: ID
    hostID: [User]
    title: String
    description: String
    date: String
    time: String
    location: String
    RSVP: [User]
    potluck: Boolean
    contribution: [Contribution]
 }

 type Contribution {
    userId: ID
    item: String
}

 # need to fix event, figuring out model 

 type User {
    _id: ID
    name: String
    email: String
    password: String
 }

 #remove password later

 type Comment {
    eventID: [Event]
    userID: [User]
    content: String
 }

 type Query {
    events: [Event]
    users: [User]
    comments: [Comment]  
 }

 # auth to be set up***

 type Mutation {
   # login(name: String!, password: String!): User
   # addUser(name: String!, email: String!, password: String!): User
    deleteUser(userID: ID!): User
    addEvent(title: String!, description: String!, date: String, time: String, location: String, potluck: Boolean): Event
    updateEvent(_id: ID, title: String, description:String, date: String, time: String, location: String ): Event
   # addinvite()

 }
`
module.exports = typeDefs;
