import { Resolver, Mutation, Arg } from "type-graphql";
import { AddRecipeInput } from "./AddRecipeInput";
import { Recipe } from "src/entity/Recipe.entity";
import { User } from "src/user/User.entity";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";


@Resolver()
@Service()
export class AddRecipeResolver {

    constructor(
        @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
        @InjectRepository(User) private userRepo: Repository<User>
    ){}

    @Mutation(() => Recipe)
    async addRecipe(@Arg("input") { title, description, ownerId }: AddRecipeInput) {
        const recipe = await this.recipeRepo.create({
            title,
            description,
            owner: await this.userRepo.findOneOrFail(ownerId)
        })
        
        return this.recipeRepo.save(recipe)
    }
}
