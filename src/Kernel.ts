import Container from "typedi";
import { createConnection, useContainer } from "typeorm";
import { ApolloServerFactory } from "./factory/ApolloServerFactory";
import { ExpressFactory } from "./factory/ExpressFactory";
import { Logger } from "./loger/Logger";

export class Kernel {
  public async boot() {
    useContainer(Container);
    await createConnection({
      name: "default",
      type: "sqlite",
      database: "test",
      synchronize: true,
      entities: ["src/**/*.entity.ts"]
    });
    return this;
  }

  public async listen() {
    const server = await Container.get(ApolloServerFactory).generate();
    const app = Container.get(ExpressFactory).generate();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      Container.get(Logger).log("server started on port 4000");
    });
  }
}
