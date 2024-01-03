const typeDefs = `
type Event{
  _id: ID
  hostID: User
  title: String!
  description: String!
  date: String!
  time: String!
  location: String!
}

type User{
  _id: ID
  name: String!
  email: String!
  password: String!
}

input UserInput{
  _id: String
}

type Query{
  events: [Event]
  event(id:ID!): Event
  users: [User]
  user(id:ID!): User
}

type Mutation{
  addEvent(hostID: UserInput!, title: String!, description: String!, date: String!, time: String!, location: String!): Event

}

`;

module.exports = typeDefs;
