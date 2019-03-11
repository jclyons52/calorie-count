import { GraphQLError } from "graphql";

export interface IGraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
  http?: Pick<Response, "headers">;
}
export interface IGqlClient {
  query: <Variables, ReturnValue = Record<string, any>>(args: {
    query: string;
    variables?: Variables;
  }) => Promise<IGraphQLResponse<ReturnValue>>;
  mutate: <Variables, ReturnValue = Record<string, any>>(args: {
    mutation: string;
    variables?: Variables;
  }) => Promise<IGraphQLResponse<ReturnValue>>;
}
