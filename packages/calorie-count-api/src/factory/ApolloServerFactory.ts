import { ApolloServer } from "apollo-server-express";
import { Request } from "express";
import { Service } from "typedi";
import { SchemaFactory } from "./SchemaFactory";

@Service()
export class ApolloServerFactory {
  constructor(private scheamFactory: SchemaFactory) {}

  public async generate(): Promise<ApolloServer> {
    const schema = await this.scheamFactory.generate();

    return new ApolloServer({
      schema,
      context: ({ req }: { req: Request & { user: unknown } }) => {
        const context = {
          req
        };
        return context;
      }
    });
  }
}
