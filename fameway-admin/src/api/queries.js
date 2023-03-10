import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query GetCurrentUser($email: String!) {
    user(where: { email: { _eq: $email } }) {
      username
      id
      firstOpening
      domain
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
        status
      }
    }
  }
`;

export const DOMAIN_DATA = gql`
  query getDomains {
    domain {
      id
      name
      key
      icon
    }
  }
`;

export const ARTICLE_DATA = gql`
  query getStore($articleID: Int!) {
    article_by_pk(id: $articleID) {
      id
      name
      description
      price
      articlePictures
    }
  }
`;
