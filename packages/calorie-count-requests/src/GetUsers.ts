import gql from "graphql-tag";

export const GetUsersQuery = gql`
  query GetUsers {
    users {
      name
      email
      recipes {
        ingredients {
          title
        }
      }
    }
  }
`;
