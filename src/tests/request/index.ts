import fs from "fs";

const read = (name: string) => {
  return fs.readFileSync(name, "utf8");
};

export const GetUsersQuery = read(__dirname + "/GetUsers.graphql");
export const RegisterUserMutation = read(__dirname + "/RegisterUser.graphql");
