import graphQLClient from "@/utils/graphql";
import { gql } from "graphql-request";

const ALL_USERS_QUERY = gql`
  query AllUsers($limit: Int!, $page: Int!, $ids: [String]) {
    allUsers(limit: $limit, page: $page, ids: $ids) {
      id
      username
    }
  }
`;

export const getAllUsers = async (variables: {
  limit: number;
  page: number;
  ids?: string[];
}): Promise<{ allUsers: { id: string; username: string }[] }> =>
  graphQLClient.request({
    document: ALL_USERS_QUERY,
    variables,
  });
