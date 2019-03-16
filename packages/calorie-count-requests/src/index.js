const fs = require("fs");

const read = name => fs.readFileSync(name, "utf8");
const dir = __dirname;
export const GetUsersQuery = read(dir + "/GetUsers.graphql");
export const RegisterUserMutation = read(dir + "/RegisterUser.graphql");
export const CreateIngredientMutation = read(dir + "/CreateIngredient.graphql");
