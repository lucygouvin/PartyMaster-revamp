import { gql } from '@apollo/client';

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

export const ADD_USER = gql `
mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        password
      }
    }
  }
`;

export const DELETE_USER = gql `
mutation DeleteUser($id: ID!) {
  deleteUser(_id: $id) {
    _id
  }
}
`;

export const ADD_EVENT = gql `
mutation AddEvent($title: String!, $description: String!, $date: String!, $time: String!, $location: String!, $guestList: String) {
  addEvent(title: $title, description: $description, date: $date, time: $time, location: $location, guestList: $guestList) {
    title
    time
    location
    hostID
    description
    date
    _id
  }
}
`;

export const DELETE_EVENT = gql `
mutation DeleteEvent($id: ID!) {
  deleteEvent(_id: $id) {
    _id
    
  }
}
`;

export const UPDATE_EVENT = gql `
mutation UpdateEvent($title: String, $description: String, $date: String, $time: String, $location: String, $potluck: Boolean, $id: ID!) {
  updateEvent(title: $title, description: $description, date: $date, time: $time, location: $location, potluck: $potluck, _id: $id) {
    title
    description
    time
    date
    location
    potluck
    potluckContributions {
      _id
      item
      userId
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation AddComment($id: ID!, $comment: CommentInput!) {
  addComment(_id: $id, comment: $comment) {
    title
    comment {
      commentId
      userID
      content
    }
  }
}
`;

export const DELETE_COMMENT = gql `
mutation DeleteComment($id: ID!, $commentId: ID!) {
  deleteComment(_id: $id, commentId: $commentId) {
    _id
   
  }
}
`;

export const UPDATE_RSVP = gql `
mutation UpdateRSVP($id: ID!, $rsvp: RSVPInput) {
  updateRSVP(_id: $id, RSVP: $rsvp) {
    title
    _id
    RSVP {
      userId
      invite
    }
  }
}
`;

export const ADD_GUEST = gql `
mutation AddGuest($eventId: ID!, $email: String!) {
  addGuest(eventId: $eventId, email: $email) {
    userId
    invite
  }
}
`;

export const REMOVE_GUEST = gql `
mutation RemoveGuest($eventId: ID!, $guestId: ID!) {
  removeGuest(eventId: $eventId, guestId: $guestId) {
    title
    _id
  }
}
`;

export const ADD_CONTRIBUTION = gql `
mutation AddContribution($eventId: ID!, $contribution: ContributionInput!) {
  addContribution(eventId: $eventId, contribution: $contribution) {
    title
    _id
    potluckContributions {
      _id
      userId
      item
    }
  }
}
`;

export const DELETE_CONTRIBUTION = gql `
mutation DeleteContribution($eventId: ID!, $contribution: ContributionInput!) {
  deleteContribution(eventId: $eventId, contribution: $contribution) {
    title
    _id
    potluckContributions {
      _id
    }
  }
}
`;
