import { Query, Resolver } from "type-graphql";

@Resolver()
export class QueryResolver {
  @Query(() => String)
  public async hello() {
    return "Hello World!";
  }
}
