import { gql } from '@apollo/client';

export const ADD_EVENT = gql `
mutation AddEvent($hostId: UserInput!, $title: String!, $description: String!, $date: String!, $time: String!, $location: String!) {
  addEvent(hostID: $hostId, title: $title, description: $description, date: $date, time: $time, location: $location) {
    _id
    hostID {
      _id
      name
      email
      password
    }
    title
    description
    date
    time
    location
  }
}
`;

export const ADD_COMMENT = gql `
mutation AddComment($eventId: ID!, $userId: UserInput!, $content: CommentInput!) {
  addComment(eventID: $eventId, userID: $userId, content: $content) {
    _id
    hostID {
      _id
      name
      email
      password
    }
    title
    description
    date
    time
    location
    comment {
      _id
      userId {
        _id
        name
        email
        password
      }
      content
    }
  }
}
`;

