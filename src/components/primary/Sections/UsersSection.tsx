import React from "react";
// Components
import Button from "../../common/Button";
import UserCard from "../../common/UserCard";

const UsersSection: React.FC = () => {
  return (
    <section className="users-section">
      <div className="users-section__content container">
        <h1 className="intro-section__title">Working with GET request</h1>
        Users
        <UserCard />
      </div>
    </section>
  );
};

export default UsersSection;
