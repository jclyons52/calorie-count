import {
  GetUser,
  GetUserQuery,
  GetUsers,
  GetUsersQuery,
  RegisterUser,
  RegisterUserMutation
} from "@calorie-count/requests";
import { AsyncTest, Expect, Timeout } from "alsatian";
import { BaseTest } from "./BaseTest";

export class UserResolverSpec extends BaseTest {
  @AsyncTest()
  @Timeout(50000)
  public async itGetsUsers() {
    await this.seed();
    const client = await this.getTestClient();
    const response = await client.query<GetUsers.Variables, GetUsers.Query>({
      query: GetUsersQuery
    });
    Expect(response).toBeDefined();
    Expect(response.data!.users.length).toBe(2);
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

  @AsyncTest()
  @Timeout(50000)
  public async itGetsUser() {
    const client = await this.getTestClient();
    const user = await this.factories.userFactory.make();
    const response = await client.query<GetUser.Variables, GetUser.Query>({
      query: GetUserQuery,
      variables: {
        userId: user.id
      }
    });

    Expect(response.data!.user.name).toBe(user.name);
  }
}
