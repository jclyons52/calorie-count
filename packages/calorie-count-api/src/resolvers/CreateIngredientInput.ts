import { Field, InputType } from "type-graphql";

@InputType()
export class CreateIngredientInput {
  @Field()
  public title: string;

  @Field()
  public calories: number;

  @Field()
  public unit: string;
}
