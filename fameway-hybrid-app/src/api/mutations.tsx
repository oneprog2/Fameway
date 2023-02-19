import { gql } from "@apollo/client";

export const INSERT_ADDRESS = gql`
  mutation InsertAddress(
    $ownerID: String!
    $name: String!
    $addressLineOne: String!
    $addressLineTwo: String
    $city: String!
    $state: String!
    $zipCode: String!
    $phonenumber: String
    $instructions: String
    $isDefault: Boolean
  ) {
    insert_address_one(
      object: {
        name: $name
        addressLineOne: $addressLineOne
        addressLineTwo: $addressLineTwo
        city: $city
        state: $state
        zipcode: $zipCode
        phonenumber: $phonenumber
        instructions: $instructions
        isDefault: $isDefault
        ownerID: $ownerID
      }
    ) {
      id
    }
  }
`;

export const CREATE_CART = gql`
  mutation CreateCart($ownerID: String!) {
    insert_cart_one(object: { ownerID: $ownerID }) {
      id
    }
  }
`;

export const CREATE_CART_ITEM = gql`
  mutation CreateCartItem($cartID: uuid!, $articleID: Int!) {
    insert_cartItem_one(object: { cartID: $cartID, articleID: $articleID }) {
      id
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cartItemID: uuid!, $quantity: Int!) {
    update_cartItem_by_pk(
      pk_columns: { id: $cartItemID }
      _set: { quantity: $quantity }
    ) {
      id
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($cartItemID: uuid!) {
    delete_cartItem_by_pk(id: $cartItemID) {
      id
    }
  }
`;

export type payment_intent_billing_details_input = {
  name: string;
  firstname: string;
  lastname: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  email: string;
  phone: string;
};

export const CREATE_PAYMENT_INTENT = gql`
  mutation createPaymentIntent(
    $amount: Int!
    $payment_method_types: [String!]!
    $billing_details: payment_intent_billing_details_input!
  ) {
    createPaymentIntent {
      clientSecret
    }
  }
`;
