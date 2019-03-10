import { GraphQLSchema } from "graphql";
import { QueryResolver } from "../resolver/QueryResolver";
import { RegisterResolver } from "../user/Register.resolver";
import { UserResolver } from "../user/UserResolver";
import { buildSchema } from "type-graphql";
import Container, { Service } from "typedi";

@Service()
export class SchemaFactory {
  public async generate(): Promise<GraphQLSchema> {
    return await buildSchema({
      container: Container,
      resolvers: [QueryResolver, RegisterResolver, UserResolver],
      emitSchemaFile: true
    });
  }
}
