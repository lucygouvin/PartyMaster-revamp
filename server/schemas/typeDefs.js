const typeDefs = `
 Type Event {
    _id: ID
    title: String
    description: String
    date: String
    time: String
    location: String
    guest: [User]
    contribution: [contribution]
 }

 type Contribution {
    userId: ID
    item: String
}

 # need to fix event, figuring out model 

 Type User {
    _id: ID
    name: String
    email: String
    password: String
 }

 Type Comment {
    eventID: [Event]
    userID: [User]
    content: String
 }

 type Query {
    events: [Event]
    users: [User]
 }

 # auth to be set up***

 type Mutation {
    login(name: String!, password!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    updateEvent(_id: ID, title: String, description:String)

 }
`