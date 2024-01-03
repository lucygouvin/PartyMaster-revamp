import {gql} from '@apollo/client';

export const EVENTS = gql `
query Events {
  events{
    _id
    hostID{
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