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
    rsvpMaybe{
      invite
      userId
    }
  }
}
`;

export const EVENT_DATA = gql `
query GetEventData($id: ID!) {
  getEventData(_id: $id) {
    rsvpMaybe{
      userId
      invite
    }
    rsvpYes{
      userId
      invite
    }
    rsvpNo{
      userId
      invite
    }
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
      userID
    }
    RSVP {
      userId
      invite
    }
    potluck
    potluckContributions {
      name
      item
      _id
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