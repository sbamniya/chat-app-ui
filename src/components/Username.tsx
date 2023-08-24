import { useUsers } from "@/hooks/users";
import { Skeleton } from "antd";
import React from "react";

const Username: React.FC<{ ids: string[] }> = ({ ids }) => {
  const { data, isLoading } = useUsers({
    ids,
    limit: ids.length,
    page: 1,
  });
  const usernames = (data?.allUsers || [])
    .map(({ username }) => username)
    .join(", ");

  return <Skeleton loading={isLoading}>{usernames}</Skeleton>;
};

export default Username;
