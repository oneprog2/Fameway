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
