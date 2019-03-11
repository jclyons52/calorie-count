import { AsyncSetup, AsyncTeardown } from "alsatian";
import { createTestClient } from "apollo-server-testing";
import Container from "typedi";
import { EntityManager, QueryRunner } from "typeorm";
import { Recipe } from "../entity/Recipe.entity";
import { ApolloServerFactory } from "../factory/ApolloServerFactory";
import { Kernel } from "../Kernel";
import { Factories } from "./factory/Factories";
import { IngredientFactory } from "./factory/IngredientFactory";
import { RecipeFactory } from "./factory/RecipeFactory";
import { RecipeIngredientFactory } from "./factory/RecipeIngredientFactory";
import { UserFactory } from "./factory/UserFactory";
import { IGqlClient } from "./GqlClient";

export abstract class BaseTest {
  protected kernelOption: Kernel | null = null;
  protected queryRunner: QueryRunner;
  protected em: EntityManager;
  protected factories: Factories;

  @AsyncSetup
  public async before(): Promise<void> {
    this.kernelOption = await new Kernel().boot();
    this.factories = Container.get(Factories);
    // this.queryRunner = Container.get(Connection).createQueryRunner();
    // this.em = Container.get(EntityManager);
    // Container.set(EntityManager, this.em);
  }

  @AsyncTeardown
  public async after(): Promise<void> {
    // await Container.get(EntityManager).connection.close();
    // await this.queryRunner.rollbackTransaction();
    // await this.queryRunner.release();
  }

  protected kernel = (): Kernel => {
    if (!this.kernelOption) {
      throw new Error("Kernel not initialized");
    }
    return this.kernelOption;
  };

  protected async getTestClient(): Promise<IGqlClient> {
    const server = await Container.get(ApolloServerFactory).generate();
    return createTestClient(server) as IGqlClient;
  }

  protected async seed() {
    const users = await Container.get(UserFactory).makeManyTimes(2);
    const recipes: Recipe[] = await Promise.all(
      users.map(async owner => Container.get(RecipeFactory).make({ owner }))
    );
    for (const recipe of recipes) {
      const ingredients = await Container.get(IngredientFactory).makeManyTimes(
        2
      );
      for (const ingredient of ingredients) {
        await Container.get(RecipeIngredientFactory).make({
          ingredient,
          recipe
        });
      }
    }
  }
}
