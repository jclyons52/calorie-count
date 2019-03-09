import { Resolver, Mutation, Arg, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "./User.entity";
import { RegisterInput } from "./Register.input";
import { Service } from "typedi";
import { Repository } from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";

@Service()
@Resolver()
export class RegisterResolver {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (e) {
      console.log(e)
      return []
    }
  }

  @Mutation(() => User)
  async register(@Arg("input")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const entity = this.userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    
    return this.userRepo.save(entity);
  }
}
