import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient.entity";

@ObjectType()
@Entity()
export class Ingredient {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public title: string;

  @Field()
  @Column()
  public calories: number;

  @Field()
  @Column()
  public unit: string;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, ri => ri.recipe)
  public recipeIngredients: RecipeIngredient[];
}
