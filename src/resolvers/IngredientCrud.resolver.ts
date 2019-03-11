import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Ingredient } from "../entity/Ingredient.entity";
import { CreateIngredientInput } from "./CreateIngredientInput";

@Service()
@Resolver()
export class IngredientCrudResolver {
  constructor(
    @InjectRepository(Ingredient) protected repo: Repository<Ingredient>
  ) {}

  @Mutation(() => Ingredient)
  public async createIngredient(
    @Arg("data") data: CreateIngredientInput
  ): Promise<Ingredient> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  @Mutation(() => Ingredient)
  public async updateIngredient(
    @Arg("id") id: string,
    @Arg("data") data: CreateIngredientInput
  ): Promise<Ingredient> {
    const entity = await this.repo.findOneOrFail(id);
    entity.title = data.title;
    entity.calories = data.calories;
    entity.unit = data.unit;

    return this.repo.save(entity);
  }

  @Mutation(() => Boolean)
  public async deleteIngredient(@Arg("id") id: string) {
    const entity = await this.repo.findOneOrFail(id);
    this.repo.remove(entity);
  }
}
