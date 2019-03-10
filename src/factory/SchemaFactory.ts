import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container, { Service } from "typedi";
import { QueryResolver } from "../resolvers/QueryResolver";
import { RegisterResolver } from "../user/Register.resolver";
import { UserResolver } from "../user/User.resolver";
import { AddRecipeResolver } from "../resolvers/AddRecipeResolver";
import { IngredientCrudResolver } from "../resolvers/IngredientCrud.resolver";

@Service()
export class SchemaFactory {
  public async generate(): Promise<GraphQLSchema> {
    return await buildSchema({
      container: Container,
      resolvers: [
        QueryResolver,
        RegisterResolver,
        UserResolver,
        AddRecipeResolver,
        IngredientCrudResolver
      ],
      emitSchemaFile: true
    });
  }
}
