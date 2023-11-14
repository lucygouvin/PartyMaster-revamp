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
mutation UpdateEvent($id: ID!, $title: String, $date: String, $description: String, $time: String, $location: String, $potluck: Boolean) {
  updateEvent(_id: $id, title: $title, date: $date, description: $description, time: $time, location: $location, potluck: $potluck) {
    _id
    hostID
    title
    description
    date
    time
    location
    comment {
      commentId
      userId
      content
    }
    RSVP {
      userId
      invite
    }
    potluck
    potluckContributions {
      _id
      name
      item
    }
    rsvpMaybe {
      userId
      invite
    }
    rsvpYes {
      userId
      invite
    }
    rsvpNo {
      userId
      invite
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
      userId
      content
    }
  }
}
`;

export const DELETE_COMMENT = gql `
mutation DeleteComment($id: ID!, $commentId: ID!) {
  deleteComment(_id: $id, commentId: $commentId) {
    comment {
      commentId
      userId
      content
    }
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
    rsvpYes {
      userId
      invite
    }
    rsvpNo {
      userId
      invite
    }
    rsvpMaybe {
      userId
      invite
    }
  }
}
`;

export const ADD_GUEST = gql `
mutation AddGuest($eventId: ID!, $email: String!) {
  addGuest(eventId: $eventId, email: $email) {
    _id
    RSVP {
      userId
      invite
    }
    rsvpYes {
      userId
      invite
    }
    rsvpNo {
      userId
      invite
    }
    rsvpMaybe {
      userId
      invite
    }
  }
}
`;

export const REMOVE_GUEST = gql `
mutation RemoveGuest($eventId: ID!, $guestId: ID!) {
  removeGuest(eventId: $eventId, guestId: $guestId) {
    title
    _id
    RSVP {
      invite
      userId
    }
    rsvpYes {
      userId
      invite
    }
    rsvpNo {
      userId
      invite
    }
    rsvpMaybe {
      userId
      invite
    }
  }
}
`;

export const ADD_CONTRIBUTION = gql `
mutation AddContribution($eventId: ID!, $contribution: ContributionInput!) {
  addContribution(eventId: $eventId, contribution: $contribution) {
    
    potluckContributions {
      _id
      name
      item
    }
    _id
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

export const CLAIM_CONTRIBUTION = gql `
mutation ClaimContribution($eventId: ID!, $contribution: ContributionInput!) {
  claimContribution(eventId: $eventId, contribution: $contribution) {
    _id
    potluckContributions {
      _id
      name
      item
    }
  }
}
`;

export const UPDATE_COMMENT = gql `
mutation UpdateComment($id: ID!, $comment: CommentInput!) {
  updateComment(_id: $id, comment: $comment) {
    comment {
      commentId
      userId
      content
    }
  }
}
`;
