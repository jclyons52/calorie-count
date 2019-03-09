import faker from "faker";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Recipe } from "../../entity/Recipe.entity";
import { Factory } from "./Factory";

@Service()
export class RecipeFactory extends Factory<Recipe> {
  constructor(@InjectRepository(Recipe) repo: Repository<Recipe>) {
    super(repo);
  }

  public create({
    title = faker.lorem.sentence(),
    description = faker.lorem.paragraph(),
    creationDate = new Date()
  }: Partial<Recipe>): Recipe {
    return this.repository.create({ title, description, creationDate });
  }
}
