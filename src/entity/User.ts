import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean = true;

    @Field(() => [Recipe])
    @OneToMany(() => Recipe, recipe => recipe.owner)
    recipes: Recipe[]

    @Field()
    name(@Root() user: User): string {
        return user.firstName + " " + user.lastName
    }
}
