import { gql } from "@apollo/client";

export const USER_DATA = gql`
  query GetUserData($id: String!) {
    user_by_pk(id: $id) {
      id
      username
      email
      carts(where: { wishlist: { _eq: false } }) {
        id
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

export const ADDRESSES_DATA = gql`
  query getAddresses {
    address {
      id
      name
      addressLineOne
      addressLineTwo
      city
      state
      zipcode
      phonenumber
      isDefault
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
        profilePicture
      }
    }
  }
`;

export const CART_DATA = gql`
  query GetCart($ownerID: String, $wishlist: Boolean) {
    cart(where: { ownerID: { _eq: $ownerID }, wishlist: { _eq: $wishlist } }) {
      id
      name
      ownerID
      created_at
      cartItems {
        id
        quantity
        article {
          created_at
          id
          name
          price
          articlePictures
          store {
            id
            name
            profilePicture
          }
        }
      }
    }
  }
`;
