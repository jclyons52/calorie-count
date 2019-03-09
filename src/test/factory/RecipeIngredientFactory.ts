import faker from "faker";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RecipeIngredient } from "../../entity/RecipeIngredient.entity";
import { Factory } from "./Factory";

@Service()
export class RecipeIngredientFactory extends Factory<RecipeIngredient> {

    constructor(@InjectRepository(RecipeIngredient) repo: Repository<RecipeIngredient>) {
        super(repo);
    }

    public create({
        ingredient,
        recipe,
        quantity = faker.random.number(),
    }: Partial<RecipeIngredient>): RecipeIngredient {
        return this.repository.create({ ingredient, recipe, quantity });
    }

}
