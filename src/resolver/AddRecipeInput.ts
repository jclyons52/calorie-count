import { InputType, Field } from "type-graphql";


@InputType()
export class AddRecipeInput {
    @Field()
    title: string;
  
    @Field({ nullable: true })
    description?: string;
    
    @Field()
    ownerId: string;
}
