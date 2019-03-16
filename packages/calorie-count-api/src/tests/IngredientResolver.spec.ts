import {
  CreateIngredient,
  CreateIngredientMutation
} from "@calorie-count/requests";
import { Expect, Test } from "alsatian";
import { Ingredient } from "../entity/Ingredient.entity";
import { BaseTest } from "./BaseTest";

export class IngredientResolverSpec extends BaseTest {
  @Test()
  public async createNewIngredient() {
    const client = await this.getTestClient();
    const ingredient = this.factories.ingredientFactory.create();
    const result = await client.mutate<
      CreateIngredient.Variables,
      CreateIngredient.Mutation
    >({
      mutation: CreateIngredientMutation,
      variables: {
        data: {
          title: ingredient.title,
          calories: ingredient.calories,
          unit: ingredient.unit
        }
      }
    });
    const ingredientResult = result.data!.createIngredient;
    Expect(ingredientResult.title).toBe(ingredient.title);
    let indb: Ingredient | undefined;
    try {
      indb = await this.em
        .getRepository(Ingredient)
        .findOne(ingredientResult.id);
    } catch (e) {
      console.log(e);
    }
    Expect(indb!.id).toBe(Number(ingredientResult.id));
  }
}
