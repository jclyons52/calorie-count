import "reflect-metadata"

import Container from "typedi";
import { UserFactory } from "./test/factory/UserFactory";
import { RecipeIngredientFactory } from "./test/factory/RecipeIngredientFactory";
import { RecipeFactory } from "./test/factory/RecipeFactory";
import { Recipe } from "./entity/Recipe.entity";
import { IngredientFactory } from "./test/factory/IngredientFactory";
import { useContainer, createConnection } from "typeorm";


const seed = async () => {
    useContainer(Container);
    await createConnection();
    
    const users = await Container.get(UserFactory).makeManyTimes(5)
    const recipes: Recipe[] = await Promise.all(
        users.map(async (owner) => Container.get(RecipeFactory).make({ owner }))
    )
    for (const recipe of recipes) {
        const ingredients = await Container.get(IngredientFactory).makeManyTimes(4);
        for (const ingredient of ingredients) {
            await Container.get(RecipeIngredientFactory).make({ ingredient, recipe })
        }
    }
}

seed();