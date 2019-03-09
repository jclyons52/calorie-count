import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import { Logger } from "../loger/Logger";
import { RegisterInput } from "./Register.input";
import { User } from "./User.entity";

@Service()
@Resolver()
export class RegisterResolver {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private logger: Logger,
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

  @Mutation(() => User)
  public async register(@Arg("input")
  {
    firstName,
    lastName,
    email,
    password,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const entity = this.userRepo.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return this.userRepo.save(entity);
  }
}
