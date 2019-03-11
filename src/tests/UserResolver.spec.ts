import { AsyncTest, Expect, Timeout } from "alsatian";
import fs from "fs";
import path from "path";
import { GetUsers } from "../client-types";
import { BaseTest } from "./BaseTest";

const read = (name: string) => {
  return fs.readFileSync(path.resolve(__dirname, name), "utf8");
};

export class UserResolverSpec extends BaseTest {
  @AsyncTest()
  @Timeout(50000)
  public async smoke() {
    await this.seed();
    const client = await this.getTestClient();
    const response = await client.query<GetUsers.Variables, GetUsers.Query>({
      query: read("/request/GetUsers.graphql")
    });
    Expect(response).toBeDefined();
  }
}
