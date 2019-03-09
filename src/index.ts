import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import { Logger } from "./loger/Logger";
import { RegisterResolver } from "./user/Register.resolver";
import { UserResolver } from "./user/UserResolver";

@Resolver()
class HelloResolver {
  @Query(() => String)
  public async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  useContainer(Container);
  await createConnection();
  const schema = await buildSchema({
    container: Container,
    resolvers: [HelloResolver, RegisterResolver, UserResolver]
  });

  const server = new ApolloServer({ schema });
  const app = Express();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    Container.get(Logger).log("server started on port 4000");
  });
};

main();
