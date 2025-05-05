import React from "react";
import { User } from "../../api/users";
// Components
import UserCard from "../common/UserCard";

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
