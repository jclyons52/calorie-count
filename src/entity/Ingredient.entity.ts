import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { RecipeIngredient } from "./RecipeIngredient.entity";

@ObjectType()
@Entity()
export class Ingredient {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    calories: number;

    @Field()
    @Column()
    unit: string

    @Field(() => [RecipeIngredient])
    @OneToMany(() => RecipeIngredient, ri => ri.recipe)
    recipeIngredients: RecipeIngredient[];
}
