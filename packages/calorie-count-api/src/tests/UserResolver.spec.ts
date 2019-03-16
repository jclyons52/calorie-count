import { AsyncTest, Expect, Timeout } from "alsatian";
import { GetUsersQuery, RegisterUserMutation } from "calorie-count-requests";
import { GetUsers, RegisterUser } from "../client-types";
import { BaseTest } from "./BaseTest";

export class UserResolverSpec extends BaseTest {
  @AsyncTest()
  @Timeout(50000)
  public async smoke() {
    await this.seed();
    const client = await this.getTestClient();
    const response = await client.query<GetUsers.Variables, GetUsers.Query>({
      query: GetUsersQuery
    });
    Expect(response).toBeDefined();
  }

  @AsyncTest()
  @Timeout(50000)
  public async itCreatesUser() {
    const client = await this.getTestClient();
    const user = this.factories.userFactory.create();
    const response = await client.mutate<
      RegisterUser.Variables,
      RegisterUser.Mutation
    >({
      mutation: RegisterUserMutation,
      variables: {
        input: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password
        }
      }
    });
    const userResult = response.data!.register;
    Expect(userResult.name).toBe(user.firstName + " " + user.lastName);
  }
}
