import "reflect-metadata";

import Container from "typedi";
import { Recipe } from "./entity/Recipe.entity";
import { IngredientFactory } from "./test/factory/IngredientFactory";
import { RecipeFactory } from "./test/factory/RecipeFactory";
import { RecipeIngredientFactory } from "./test/factory/RecipeIngredientFactory";
import { UserFactory } from "./test/factory/UserFactory";
import { Kernel } from "./Kernel";

const seed = async () => {
  await new Kernel().boot();

  const users = await Container.get(UserFactory).makeManyTimes(5);
  const recipes: Recipe[] = await Promise.all(
    users.map(async owner => Container.get(RecipeFactory).make({ owner }))
  );
  for (const recipe of recipes) {
    const ingredients = await Container.get(IngredientFactory).makeManyTimes(4);
    for (const ingredient of ingredients) {
      await Container.get(RecipeIngredientFactory).make({ ingredient, recipe });
    }
  }
};

seed();
