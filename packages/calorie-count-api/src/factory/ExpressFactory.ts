import express from "express";
import jwt from "express-jwt";
import { Service } from "typedi";

@Service()
export class ExpressFactory {
  public generate(): express.Express {
    const app = express();
    const path = "/graphql";
    app.use(
      path,
      jwt({
        credentialsRequired: false,
        secret: "TypeGraphQL"
      })
    );
    return app;
  }
}
