import "reflect-metadata";

import { buildSchema, Resolver, Query } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolver/RegisterResolver";
import { UserResolver } from "./resolver/UserResolver";

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }
}

const main = async () => {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [HelloResolver, RegisterResolver, UserResolver],
      });

      const server = new ApolloServer({ schema })
      const app = Express()
      server.applyMiddleware({app})
      app.listen(4000, () => {
          console.log("server started on port 4000");
      })
}

main();
