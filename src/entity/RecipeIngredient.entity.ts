import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./Ingredient.entity";
import { Recipe } from "./Recipe.entity";

@ObjectType()
@Entity()
export class RecipeIngredient {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  public recipe: Recipe;

  @Field(() => Ingredient)
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  public ingredient: Ingredient;

  @Field()
  @Column()
  public quantity: number;
}
