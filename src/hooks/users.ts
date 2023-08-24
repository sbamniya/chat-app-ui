import { getAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEYS = {
  USER_LIST: "user-list",
};

export const useUsers = (params: Parameters<typeof getAllUsers>[0]) =>
  useQuery([QUERY_KEYS.USER_LIST, { ...params }], () => getAllUsers(params));
