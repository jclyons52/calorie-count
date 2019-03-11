import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Logger } from "../loger/Logger";

export class AuthCheck implements MiddlewareInterface<any> {
  constructor(private readonly logger: Logger) {}
  public async use({ info }: ResolverData<{}>, next: NextFn) {
    const username: string = "guest";
    this.logger.log(
      `Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`
    );
    return next();
  }
}
