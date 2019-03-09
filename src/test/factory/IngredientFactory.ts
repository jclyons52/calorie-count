import { Service } from "typedi";
import { Ingredient } from "../../entity/Ingredient.entity";
import { Factory } from "./Factory";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import faker from "faker";

@Service()
export class IngredientFactory extends Factory<Ingredient> {
  constructor(@InjectRepository(Ingredient) repo: Repository<Ingredient>) {
    super(repo);
  }

  public create({
      title = faker.lorem.word(),
      calories = faker.random.number(),
      unit = faker.random.word()
  }: Partial<Ingredient>): Ingredient {
    return this.repository.create({ title, calories, unit })
  }
}
