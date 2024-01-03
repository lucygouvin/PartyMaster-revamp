import { gql } from '@apollo/client';

export const ADD_EVENT = gql `
mutation AddEvent($hostID: String!, $title: String!, $description: String!, $date: String!, $time: String!, $location: String!) {
  addEvent(hostID: $hostId, title: $title, description: $description, date: $date, time: $time, location: $location) {
    title
    time
    location
    hostID{
      _id
      name
      email
      password
    }
    description
    date
    _id
  }
}
`;