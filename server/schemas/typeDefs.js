const typeDefs = `
type Event{
  _id: ID
  hostID: User!
  title: String!
  description: String!
  date: String!
  startTime: String
  endTime: String
  location: String!
  comment: [Comment]
  RSVP: [Invite]
  potluck: Boolean
  contribution: [Contribution]
}

type User{
  _id: ID
  name: String
  email: String
  password: String
  event: [Event]
  prevSignIn: Boolean
}

input UserInput{
  _id: ID!
}

type Comment{
  _id: ID!
  userId: User
  content: String
}

input CommentInput{
  _id: ID
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
  item: String
}

input ContributionInput{
  item: String!
}

type Auth {
  token: ID
  user: User
}

type Query{
  events: [Event]
  event(id:ID!): Event
  users: [User]
  user(id:ID!): User
}

type Mutation{
  login(email: String!, password: String!): Auth
  addUser(name: String, email: String!, password: String, params: String!): Auth
  deleteUser(id:ID!): User
  addEvent(hostID: UserInput!, title: String!, description: String!, date: String!, startTime: String!, endTime: String, location: String!, guestList: String): Event
  editEvent(_id: ID!, title: String, description:String, date: String, startTime: String, endTime: String, location: String, potluck: Boolean): Event
  deleteEvent(id:ID!): Event
  addComment(eventID:ID!, userID:UserInput!, content:CommentInput!):Event
  editComment(eventId:ID!, comment: CommentInput!): Event
  deleteComment(eventId:ID!, commentId: ID!): Event
  addContribution(eventID: ID!, userID:UserInput!, contribution:ContributionInput!):Event
}

`;

module.exports = typeDefs;
