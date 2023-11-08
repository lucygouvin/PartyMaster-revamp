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
