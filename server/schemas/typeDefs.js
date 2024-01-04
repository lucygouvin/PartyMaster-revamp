const typeDefs = `
type Event{
  _id: ID
  hostID: User!
  title: String!
  description: String!
  date: String!
  time: String!
  location: String!
  comment: [Comment]
  RSVP: [Invite]
  potluck: Boolean
  contribution: [Contribution]
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

type Comment{
  _id: ID!
  userId: User!
  content: String!
}

input CommentInput{
  content: String!
}

type Invite{
  _id: ID!
  userId: User
  invite: String!
}

type Contribution{
  _id: ID!
  userId: User
  item: String!
}

input ContributionInput{
  item: String!
}

type Query{
  events: [Event]
  event(id:ID!): Event
  users: [User]
  user(id:ID!): User
}

type Mutation{
  addEvent(hostID: UserInput!, title: String!, description: String!, date: String!, time: String!, location: String!, guestList: String): Event
  addComment(eventID:ID!, userID:UserInput!, content:CommentInput!):Event
  addContribution(eventID: ID!, userID:UserInput!, contribution:ContributionInput!):Event
}

`;

module.exports = typeDefs;
