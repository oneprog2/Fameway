import { gql } from "@apollo/client";

export const UPDATE_STORE = gql`
  mutation UpdateStore(
    $storeID: uuid!
    $status: String
    $name: String
    $bannerPicture: String
    $profilePicture: String
    $description: String
  ) {
    update_store_by_pk(
      pk_columns: { id: $storeID }
      _set: {
        status: $status
        name: $name
        bannerPicture: $bannerPicture
        profilePicture: $profilePicture
        description: $description
      }
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userID: String!, $firstOpening: Boolean) {
    update_user_by_pk(
      pk_columns: { id: $userID }
      _set: { firstOpening: $firstOpening }
    ) {
      id
    }
  }
`;
