import { Resolver, Mutation, Arg, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
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
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
