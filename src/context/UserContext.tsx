import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../api/users";

// What our context provides
type UserContextType = {
  users: User[];
  totalUsers: number;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
  addUser: (user: User) => void; // adds new user to top
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Wraps the app and provides user state
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const addUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    setTotalUsers((prev) => prev + 1);
  };

  return (
    <UserContext.Provider
      value={{ users, setUsers, totalUsers, setTotalUsers, addUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUserContext must be used within a UserProvider");
  return ctx;
};
