import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query GetCurrentUser($email: String!) {
    user(where: { email: { _eq: $email } }) {
      username
      id
      firstOpening
      stores {
        id
        name
      }
    }
  }
`;

export const STORE_DATA = gql`
  query getStore($storeID: uuid!) {
    store_by_pk(id: $storeID) {
      id
      name
      profilePicture
      bannerPicture
      description
      articles {
        id
        name
        price
        articlePictures
      }
    }
  }
`;
