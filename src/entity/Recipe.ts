import { ObjectType, Field, ID } from "type-graphql";
import { ManyToOne, BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  creationDate: Date = new Date();

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, ri => ri.recipe)
  recipeIngredients: RecipeIngredient[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.recipes)
  owner: User
}
