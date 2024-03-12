import {gql} from '@apollo/client';

export const EVENTS = gql `
query Events {
  events {
    _id
    hostID {
      _id
      name
      email
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
      }
      content
    }
    RSVP {
      _id
      userId {
        _id
        name
        email
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
      }
      content
      updatedAt
    }
    RSVP {
      _id
      userId {
        _id
        name
        email
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
      }
      item
    }
    startTime
    endTime
    rsvpYes {
      userId {
        name
        email
        _id
      }
      _id
    }
    rsvpNotResponded {
      userId {
        name
        email
        _id
      }
      _id
    }
    rsvpNo {
      userId {
        name
        email
        _id
      }
      _id
    }
    rsvpMaybe {
      _id
      userId {
        name
        email
        _id
      }
    }
  }
}`;

export const USERS = gql `
query Users {
  users {
    _id
    name
    email
  }
}
`
export const SINGLE_USER = gql `
query User($id: ID!) {
  user(id: $id) {
    _id
    name
    email
  }
}
`;

export const USER_EVENTS = gql`
query UserEvents {
  userEvents {
    event {
      title
      startTime
      location
      hostID {
        name
        _id
      }
      endTime
      description
      date
      _id
      RSVP {
        invite
        _id
        userId {
          _id
        }
      }
    }
  }
}`;