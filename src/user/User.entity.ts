import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Recipe } from "../entity/Recipe.entity";

@ObjectType()
@Entity()
export class User {
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

    get name(): string {
        return this.firstName + " " + this.lastName
    }
}
