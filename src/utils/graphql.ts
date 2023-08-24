import { GraphQLClient } from "graphql-request";

const getToken = (): string => localStorage.getItem("loginToken") || "";

const graphQLClient = new GraphQLClient(String(process.env.API_ENDPOINT), {
  headers: getToken()
    ? {
        authorization: `Bearer ${getToken()}`,
      }
    : {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  const message = (
    error.message || "An error occurred please try again."
  ).split(":")[0];

  return message;
};
export default graphQLClient;
