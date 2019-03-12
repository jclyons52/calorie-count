import { FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Ingredient } from "../entity/Ingredient.entity";
import { Recipe } from "../entity/Recipe.entity";

@Service()
@Resolver(Recipe)
export class RecipeResolver {
  constructor(@InjectRepository(Recipe) private repo: Repository<Recipe>) {}

  @FieldResolver(() => [Ingredient])
  public async ingredients(@Root() root: Recipe): Promise<Ingredient[]> {
    const entity = await this.repo.findOneOrFail(root.id, {
      relations: ["recipeIngredients", "recipeIngredients.ingredient"]
    });

    return entity.recipeIngredients.map(e => e.ingredient);
  }
}
