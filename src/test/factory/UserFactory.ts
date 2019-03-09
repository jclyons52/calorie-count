import { Factory } from "./Factory";
import { User } from "../../user/User.entity";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import faker from "faker";

@Service()
export class UserFactory extends Factory<User> {
    
    constructor(@InjectRepository(User) repo: Repository<User>) {
        super(repo)
    }
    
    public create({
        firstName = faker.name.findName(),
        lastName = faker.name.lastName(),
        email = faker.internet.email(),
        password = faker.internet.password(),
        recipes = []
    }: Partial<User>): User {
        return this.repository.create({ firstName, lastName, email, password, recipes })
    }
}
