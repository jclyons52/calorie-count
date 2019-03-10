import { ApolloServer } from "apollo-server-express";
import { Service } from "typedi";
import { SchemaFactory } from "./SchemaFactory";

@Service()
export class ApolloServerFactory {
  constructor(private scheamFactory: SchemaFactory) {}

  public async generate(): Promise<ApolloServer> {
    return new ApolloServer({ schema: await this.scheamFactory.generate() });
  }
}
