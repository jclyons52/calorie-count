import { Service } from "typedi";
import { Factory } from "./Factory";
import { Recipe } from "../../entity/Recipe.entity";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import faker from "faker";

@Service()
export class RecipeFactory extends Factory<Recipe> {

    constructor(@InjectRepository(Recipe) repo: Repository<Recipe>){
        super(repo)
    }

    public create({
        title = faker.lorem.sentence(),
        description = faker.lorem.paragraph(),
        creationDate = new Date()
    }: Partial<Recipe>): Recipe {
        return this.repository.create({ title, description, creationDate })
    }

}
