import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
      animals {
        _id
        type
        name
        description
        image
        sex
        age
      }
    }
  }
`;

export const QUERY_ALL_ANIMALS = gql`
  {
    animals {
      _id
      type
      name
      description
      image
      sex
      age
    }
  }
`;