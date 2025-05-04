import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/users";
import UserCard from "../common/UserCard";

const UserList: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-catalog">
      {/* {users.map((user) => (
        <UserCard key={user.id} />
      ))} */}
    </div>
  );
};

export default UserList;