import React, { useEffect, useState } from "react";
import { getAllUsers, User } from "../../../api/users";
import { useUserContext } from "../../../context/UserContext";
// Components
import Button from "../../common/Button";
import UserList from "../UserList";
import Preloader from "../../common/Preloader";

const UsersSection: React.FC = () => {
  // Controls loading state
  const [loadState, setLoadState] = useState<"initial" | "more" | "done">(
    "initial"
  );

  // Prevents double API call in development
  const hasFetched = React.useRef(false);

  //  Global users from context
  const { users, setUsers, totalUsers, setTotalUsers } = useUserContext();

  // How many cards currently visible
  const [cardsToShow, setCardsToShow] = useState<number>(6);

  // Fetch all users on mount
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadUsers = async () => {
      setLoadState("initial");

      try {
        const allUsers = await getAllUsers();
        const sortedUsers = allUsers.sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        );
        setUsers(sortedUsers);
        setTotalUsers(sortedUsers.length);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoadState("done");
      }
    };

    loadUsers();
  }, []);

  // Reset to 6 cards if users change (e.g., after registration)
  useEffect(() => {
    if (users.length > cardsToShow) {
      setCardsToShow(6);
    }
  }, [users]);

  // Show next 6 cards
  const handleShowMore = () => {
    setLoadState("more");
    setTimeout(() => {
      setCardsToShow((prev) => prev + 6);
      setLoadState("done");
    }, 300);
  };

  return (
    <section id="users" className="users-section">
      <div className="users-section__content container">
        <h1 className="users-section__title">Working with GET request</h1>

        <UserList users={users.slice(0, cardsToShow)} />

        {cardsToShow < totalUsers &&
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
