import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container, { Service } from "typedi";
import { IngredientCrudResolver } from "../resolvers/IngredientCrud.resolver";
import { QueryResolver } from "../resolvers/QueryResolver";
import { RecipeResolver } from "../resolvers/Recipe.resolver";
import { RecipeCrudResolver } from "../resolvers/RecipeCrud.resolver";
import { RegisterResolver } from "../user/Register.resolver";
import { UserResolver } from "../user/User.resolver";

@Service()
export class SchemaFactory {
  public async generate(): Promise<GraphQLSchema> {
    return await buildSchema({
      container: Container,
      resolvers: [
        QueryResolver,
        RegisterResolver,
        UserResolver,
        RecipeCrudResolver,
        IngredientCrudResolver,
        RecipeResolver
      ],
      emitSchemaFile: true
    });
  }
}
