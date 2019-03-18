import gql from "graphql-tag";

export const GetUserQuery = gql`
  query GetUser($userId: Float!) {
    user(userId: $userId) {
      name
      email
      recipes {
        id
        title
      }
    }
  }
`;
