import { Resolver, FieldResolver, Root } from "type-graphql";
import { User } from "../entity/User";
import { Recipe } from "../entity/Recipe";


@Resolver(User)
export class UserResolver {
    @FieldResolver(() => [Recipe])
    async recipes(@Root() user: User): Promise<Recipe[]> {
        return Recipe.find({ where: { user } })
    }
}
