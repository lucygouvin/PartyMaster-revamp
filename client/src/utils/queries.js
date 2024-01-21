import {gql} from '@apollo/client';

export const EVENTS = gql `
query Events {
  events {
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
    startTime
    endTime
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
    potluck
    contribution {
      _id
      userId {
        _id
        name
        email
        password
      }
      item
    }
  }
}`;

export const EVENT = gql `
query Event($eventId: ID!) {
  event(id: $eventId) {
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
    potluck
    contribution {
      _id
      userId {
        _id
        name
        email
        password
      }
      item
    }
    startTime
    endTime
  }
}`;

export const USERS = gql `
query Users {
  users {
    _id
    name
    email
    password
  }
}
`
export const SINGLE_USER = gql `
query User($id: ID!) {
  user(id: $id) {
    _id
    name
    email
    password
  }
}
`
;