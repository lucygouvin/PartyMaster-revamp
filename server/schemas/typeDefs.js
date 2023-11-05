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
 }

 type Contribution {
   userId: [User]
   item: String
}

 # auth to be set up***

 type Mutation {
   # login(name: String!, password: String!): User
   # addUser(name: String!, email: String!, password: String!): User
    deleteUser(userID: ID!): User
    addEvent(title: String!, description: String!, date: String!, time: String!, location: String!, potluck: Boolean!, contribution: [Contribution]): Event
    updateEvent(_id: ID, title: String!, description:String!, date: String!, time: String!, location: String, potluck: Boolean!,  contribution: [Contribution]): Event
   # addinvite()

 }
`;
module.exports = typeDefs;
