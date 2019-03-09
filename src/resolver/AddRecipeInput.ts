import { Field, InputType } from "type-graphql";

@InputType()
export class AddRecipeInput {
  @Field()
  public title: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public ownerId: string;
}
