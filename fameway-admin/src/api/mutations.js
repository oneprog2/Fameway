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

export const UPSERT_ARTICLE = gql`
  mutation upsert_article(
    $storeID: uuid!
    $name: String
    $description: String
    $articlePictures: _text
    $price: Int
  ) {
    insert_article(
      objects: {
        storeID: $storeID
        status: "draft"
        name: $name
        description: $description
        articlePictures: $articlePictures
        price: $price
      } # on_conflict: {
    ) #   constraint: article_pkey
    #   update_columns: [status, name, description, articlePictures, price]
    # }
    {
      returning {
        id
      }
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
