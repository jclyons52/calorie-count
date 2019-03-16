// ====================================================
// Documents
// ====================================================

export namespace CreateIngredient {
  export type Variables = {
    data: CreateIngredientInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createIngredient: CreateIngredient;
  };

  export type CreateIngredient = {
    __typename?: "Ingredient";

    id: string;

    title: string;
  };
}

export namespace GetUsers {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    users: Users[];
  };

  export type Users = {
    __typename?: "User";

    recipes: Recipes[];
  };

  export type Recipes = {
    __typename?: "Recipe";

    ingredients: Ingredients[];
  };

  export type Ingredients = {
    __typename?: "Ingredient";

    title: string;
  };
}

export namespace RegisterUser {
  export type Variables = {
    input: RegisterInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    register: Register;
  };

  export type Register = {
    __typename?: "User";

    id: string;

    name: string;

    email: string;
  };
}

export type Maybe<T> = T | null;

export interface CreateIngredientInput {
  title: string;

  calories: number;

  unit: string;
}

export interface AddRecipeInput {
  title: string;

  description?: Maybe<string>;

  ownerId: string;
}

export interface RegisterInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;
