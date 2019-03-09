import { Recipe } from "src/entity/Recipe.entity";
import { User } from "src/user/User.entity";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { AddRecipeInput } from "./AddRecipeInput";

@Service()
@Resolver()
export class AddRecipeResolver {

    constructor(
        @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    @Mutation(() => Recipe)
    public async addRecipe(@Arg("input") { title, description, ownerId }: AddRecipeInput) {
        const recipe = await this.recipeRepo.create({
            description,
            owner: await this.userRepo.findOneOrFail(ownerId),
            title,
        });

        return this.recipeRepo.save(recipe);
    }
}
