import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../user/User.entity";
import { RecipeIngredient } from "./RecipeIngredient.entity";

@ObjectType()
@Entity()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description?: string;

  @Field()
  @Column()
  public creationDate: Date = new Date();

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, ri => ri.recipe)
  public recipeIngredients: RecipeIngredient[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.recipes)
  public owner: User;
}
