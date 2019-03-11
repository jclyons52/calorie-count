import { AsyncTest, Expect, Timeout } from "alsatian";
import { BaseTest } from "./BaseTest";

export class UserResolverSpec extends BaseTest {
  @AsyncTest()
  @Timeout(50000)
  public async smoke() {
    await this.seed();
    const client = await this.getTestClient();
    const response = await client.query({
      query: `
            query {
                users {
                recipes {
                    ingredients {
                    title
                    }
                }
                }
            }
          `
    });
    Expect(response).toBeDefined();
  }
}
