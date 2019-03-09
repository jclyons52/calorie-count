import { FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Recipe } from "../entity/Recipe.entity";
import { Logger } from "../loger/Logger";
import { User } from "./User.entity";

@Service()
@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
    private logger: Logger
  ) {}

  @FieldResolver(() => [Recipe])
  public async recipes(@Root() user: User): Promise<Recipe[]> {
    try {
      return this.recipeRepo.find({ where: { user } });
    } catch (e) {
      this.logger.log(e);
      return [];
    }
  }

  @FieldResolver(() => String)
  public name(@Root() user: User): string {
    return user.name;
  }
}
