import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "../entity/Recipe.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public firstName: string;

  @Field()
  @Column()
  public lastName: string;

  @Field()
  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public isActive: boolean = true;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, recipe => recipe.owner)
  public recipes: Recipe[];

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}
