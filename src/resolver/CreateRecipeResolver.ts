import { Resolver, Mutation, Arg } from "type-graphql";
import { AddRecipeInput } from "./AddRecipeInput";
import { Recipe } from "src/entity/Recipe";
import { User } from "src/entity/User";


@Resolver()
export class AddRecipeResolver {
    @Mutation(() => Recipe)
    async addRecipe(@Arg("input") { title, description, ownerId }: AddRecipeInput) {
        const recipe = await Recipe.create({
            title,
            description,
            owner: await User.findOneOrFail(ownerId)
        }).save()

        return recipe;
    }
}
