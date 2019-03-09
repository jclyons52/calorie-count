import "reflect-metadata";

import { buildSchema, Resolver, Query } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection, useContainer } from "typeorm";
import { RegisterResolver } from "./user/Register.resolver";
import { UserResolver } from "./user/UserResolver";
import { Container } from "typedi";

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }
}

const main = async () => {
    useContainer(Container);
    await createConnection();
    const schema = await buildSchema({
        resolvers: [HelloResolver, RegisterResolver, UserResolver],
        container: Container
      });

      const server = new ApolloServer({ schema })
      const app = Express()
      server.applyMiddleware({app})
      app.listen(4000, () => {
          console.log("server started on port 4000");
      })
}

main();
