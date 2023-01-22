import { gql } from "@apollo/client";

export const STORES = gql`
  query {
    store {
      id
    }
  }
`;
