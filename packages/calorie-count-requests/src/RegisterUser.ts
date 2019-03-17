import gql from "graphql-tag";

export const RegisterUserMutation = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
    }
  }
`;
