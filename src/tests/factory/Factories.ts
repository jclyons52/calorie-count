import { Service } from "typedi";
import { IngredientFactory } from "./IngredientFactory";
import { RecipeFactory } from "./RecipeFactory";
import { RecipeIngredientFactory } from "./RecipeIngredientFactory";
import { UserFactory } from "./UserFactory";

@Service()
export class Factories {
  constructor(
    public userFactory: UserFactory,
    public ingredientFactory: IngredientFactory,
    public recipeFactory: RecipeFactory,
    public recipeIngredientFactory: RecipeIngredientFactory
  ) {}
}
