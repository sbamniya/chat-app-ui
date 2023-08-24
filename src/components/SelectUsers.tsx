import React from "react";
import { Select, SelectProps } from "antd";
import { useUsers } from "@/hooks/users";

const SelectUsers: React.FC<SelectProps> = (props) => {
  const { isLoading, data } = useUsers({ limit: 1000, page: 1 });

  const users = data?.allUsers || [];
  return (
    <Select
      placeholder="Start new chat"
      style={{
        width: "100%",
      }}
      loading={isLoading}
      {...props}
    >
      {users.map((user) => (
        <Select.Option value={user.id} key={user.id}>
          {user.username}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectUsers;
