import { gql } from '@apollo/client';

export const ADD_USER = gql `
mutation AddUser($email: String!, $name: String, $password: String, $params: String!) {
  addUser(email: $email, name: $name, password: $password, params: $params) {
    token
    user {
      name
      email
      _id
    }
  }
}`;

export const DELETE_USER = gql `
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    _id
  }
}`;

export const LOGIN = gql `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      name
      
      
    }
  }
}
`;

export const ADD_EVENT = gql `
mutation AddEvent($hostId: UserInput!, $title: String!, $description: String!, $date: String!, $time: String!, $location: String!, $guestList: String) {
  addEvent(hostID: $hostId, title: $title, description: $description, date: $date, time: $time, location: $location, guestList: $guestList) {
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

export const DELETE_EVENT = gql `
mutation DeleteEvent($deleteEventId: ID!) {
  deleteEvent(id: $deleteEventId) {
    _id
  }
}`;

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
    RSVP {
      _id
      userId {
        _id
        name
        email
        password
      }
      invite
    }
  }
}
`;

export const DELETE_COMMENT = gql `
mutation DeleteComment($eventId: ID!, $commentId: ID!) {
  deleteComment(eventId: $eventId, commentId: $commentId) {
    comment {
      _id
    }
  }
}`;

export const EDIT_COMMENT = gql `
mutation EditComment($eventId: ID!, $comment: CommentInput!) {
  editComment(eventId: $eventId, comment: $comment) {
    comment {
      _id
      content
      userId {
        _id
      }
    }
  }
}`;

