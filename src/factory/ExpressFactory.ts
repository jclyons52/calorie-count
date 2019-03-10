import Express from "express";
import { Service } from "typedi";

@Service()
export class ExpressFactory {
  public generate(): Express.Express {
    return Express();
  }
}
