import { Resolver, FieldResolver, Root } from "type-graphql";
import { User } from "./User.entity";
import { Recipe } from "../entity/Recipe.entity";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";


@Resolver(User)
@Service()
export class UserResolver {

    constructor(
        @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>
    ){}

    @FieldResolver(() => [Recipe])
    async recipes(@Root() user: User): Promise<Recipe[]> {
        return this.recipeRepo.find({ where: { user } })
    }

    @FieldResolver(() => String)
    name(@Root() user: User): string {
        return user.name;
    }
}
