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
        status
      }
    }
  }
`;

export const PROMOTION_CARD = gql`
  query getPromotionCard {
    promotionCard {
      id
      title
      type
      description
      buttonText
      pictures
      link
    }
  }
`;

export const STORES_DATA = gql`
  query getStores {
    store {
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

export const ARTICLE_DATA = gql`
  query getArticle($articleID: Int!) {
    article_by_pk(id: $articleID) {
      id
      name
      description
      price
      articlePictures
      store {
        id
        name
      }
    }
  }
`;
