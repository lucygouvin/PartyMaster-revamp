const typeDefs = `
# need to fix event, figuring out model 
 type Event {
    _id: ID
    hostID: [User]
    title: String!
    description: String!
    date: String!
    time: String!
    location: String!
    comment: [Comment]
    RSVP: [Invite]
    potluck: Boolean!
    contribution: [Contribution]
 }

 #remove password later
 type User {
    _id: ID
    name: String
    email: String
    password: String
 }

 type Comment {
    userID: [User]
    content: String
 }

 type Invite {
   userId: [User]!
   invite: String!
 }

 type Query {
    events: [Event]
    users: [User]
    me: User
    getEventData(_id: ID!): Event
    getUserEvents(_id: ID!): User
 }

 type Contribution {
   userId: [User]
   item: String
}

 # auth to be set up***

 type Auth{
   token: ID
   user: User
}

 type Mutation {
   # login(name: String!, password: String!): User
   # addUser(name: String!, email: String!, password: String!): User
    deleteUser(userID: ID!): User
    addEvent(title: String!, description: String!, date: String!, time: String!, location: String!, potluck: Boolean!, contribution: [Contribution]): Event
    updateEvent(_id: ID, title: String!, description:String!, date: String!, time: String!, location: String, potluck: Boolean!,  contribution: [Contribution]): Event
   # addinvite()
   deleteEvent(_id: ID!): Event
   addComment(_id: ID!, comment.content: String): Event
   deleteComment(_id:ID!, comment._id: ID!): Event
   updateRSVP (_id: ID!, RSVP.invite: String!): Event
   addContribution (_id:ID!, contribution.item: String!): Event
   deleteContribution (_id:ID!, contribution.item:String!): Event



 }
`;
module.exports = typeDefs;
