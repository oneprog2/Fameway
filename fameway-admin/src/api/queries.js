import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query GetCurrentUser($email: String!) {
    user(where: { email: { _eq: $email } }) {
      username
    }
  }
`;
