import { gql } from '@apollo/client';

export const USERS = gql`
query Query {
    users {
      _id
      name
      email
      password
    }
  }`;

export const EVENTS = gql `
query Events {
  events {
    _id
   
    title
    description
    date
    time
    location
    
    potluck
    comment {
      commentId
      content
    }

    RSVP {
      invite
      userId
    }
    
  }
}
`;

export const EVENT_DATA = gql `
query GetEventData($id: ID!) {
  getEventData(_id: $id) {
    _id
    hostID 
    title
    description
    date
    time
    location
    comment {
      commentId
      content
      userID {
        name
        _id
        email
      }
    }
    RSVP {
      userId
      invite
    }
    potluck
    potluckContributions {
      _id
      userId
      item
    }
  }
}`;

export const GET_USER_EVENTS = gql `
query GetUserEvents {
  getUserEvents {
  
    event {
      title
      time
      location
      date
      RSVP {
        userId
        invite
      }
      _id
      hostID 
    }

  }
}
`;