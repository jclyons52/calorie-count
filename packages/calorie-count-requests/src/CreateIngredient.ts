import gql from "graphql-tag";

export const CreateIngredientMutation = gql`
  mutation CreateIngredient($data: CreateIngredientInput!) {
    createIngredient(data: $data) {
      id
      title
    }
  }
`;
