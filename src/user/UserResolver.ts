import { Resolver, FieldResolver, Root } from "type-graphql";
import { User } from "./User.entity";
import { Recipe } from "../entity/Recipe.entity";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

@Service()
@Resolver(User)
export class UserResolver {

    constructor(
        @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>
    ){
        console.log(recipeRepo);
    }

    @FieldResolver(() => [Recipe])
    async recipes(@Root() user: User): Promise<Recipe[]> {
        try {
            return this.recipeRepo.find({ where: { user } })
        } catch (e) {
            console.log(e)
            return []
        }
    }

    @FieldResolver(() => String)
    name(@Root() user: User): string {
        return user.name;
    }
}
