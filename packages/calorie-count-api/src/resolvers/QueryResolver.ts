import { Arg, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Logger } from "../loger/Logger";
import { User } from "../user/User.entity";

@Resolver()
export class QueryResolver {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private logger: Logger
  ) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (e) {
      this.logger.log(e);
      return [];
    }
  }

  @Query(() => User)
  public async user(@Arg("userId") userId: number): Promise<User> {
    return this.userRepo.findOneOrFail(userId);
  }
}
