import graphQLClient from "@/utils/graphql";
import { gql } from "graphql-request";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const login = async (variables: {
  username: string;
  password: string;
}): Promise<{ login: { token: string; user: { id: string } } }> =>
  graphQLClient.request({
    document: LOGIN_MUTATION,
    variables,
  });

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const signup = async (variables: {
  username: string;
  password: string;
}): Promise<{ signup: { token: string; user: { id: string } } }> =>
  graphQLClient.request({
    document: SIGNUP_MUTATION,
    variables,
  });
