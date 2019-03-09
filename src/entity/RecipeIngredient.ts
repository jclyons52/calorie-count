import { ObjectType, Field, ID } from "type-graphql";
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

@ObjectType()
@Entity()
export class RecipeIngredient {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => Recipe)
    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
    recipe: Recipe

    @Field(() => Ingredient)
    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
    ingredient: Ingredient

    @Field()
    @Column()
    quantity: number;
}
