import React, { useEffect, useRef } from "react";
import { User } from "../../api/users";
// Images
import imgPlaceholder from "../../assets/images/photo-cover.svg";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const { name, position, email, phone, photo } = user;

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const contents = cardRef.current?.querySelectorAll<HTMLElement>(
      ".user-card__field__content"
    );
    contents?.forEach((content) => {
      if (content.scrollWidth > content.clientWidth) {
        const field = content.parentElement;
        if (!field) return;

        field.classList.add("has-tooltip");

        const tooltip = document.createElement("span");
        tooltip.className = "user-card__field__tooltip";
        tooltip.textContent = content.textContent || "";
        field.appendChild(tooltip);
      }
    });
  }, []);

  return (
    <div className="user-card" ref={cardRef}>
      <img
        src={photo && photo.trim() !== "" ? photo : imgPlaceholder}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imgPlaceholder;
        }}
        alt={`${name}'s avatar`}
        className="user-card__img"
      />
      <p className="user-card__field user-card__name">
        <span className="user-card__field__content">{name}</span>
      </p>
      <p className="user-card__field">
        <span className="user-card__field__content">{position}</span>
      </p>
      <p className="user-card__field">
        <span className="user-card__field__content">{email}</span>
      </p>
      <p className="user-card__field">
        <span className="user-card__field__content">{phone}</span>
      </p>
    </div>
  );
};

export default UserCard;
