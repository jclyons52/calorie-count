import faker from "faker";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../user/User.entity";
import { Factory } from "./Factory";

@Service()
export class UserFactory extends Factory<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  public create({
    firstName = faker.name.findName(),
    lastName = faker.name.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
    recipes = []
  }: Partial<User> = {}): User {
    return this.repository.create({
      email,
      firstName,
      lastName,
      password,
      recipes
    });
  }
}
