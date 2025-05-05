import React, { useEffect, useState } from "react";
import { getAllUsers, User } from "../../../api/users";
// Components
import Button from "../../common/Button";
import UserList from "../UserList";
import Preloader from "../../common/Preloader";

const UsersSection: React.FC = () => {
  const [loadState, setLoadState] = useState<"initial" | "more" | "done">(
    "initial"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [cardsToShow, setCardsToShow] = useState<number>(6);

  useEffect(() => {
    const loadUsers = async () => {
      setLoadState("initial");

      try {
        const allUsers = await getAllUsers();
        const sortedUsers = allUsers.sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        );
        setUsers(sortedUsers);

        console.log(allUsers.length);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoadState("done");
      }
    };

    loadUsers();
  }, []);

  const handleShowMore = () => {
    setLoadState("more");
    setTimeout(() => {
      setCardsToShow((prev) => prev + 6);
      setLoadState("done");
    }, 300);
  };

  return (
    <section className="users-section">
      <div className="users-section__content container">
        <h1 className="users-section__title">Working with GET request</h1>

        <UserList users={users.slice(0, cardsToShow)} />

        {cardsToShow < users.length &&
          (loadState === "more" ? (
            <Preloader />
          ) : (
            <Button onClick={handleShowMore} width="120px">
              Show more
            </Button>
          ))}
      </div>
    </section>
  );
};

export default UsersSection;
