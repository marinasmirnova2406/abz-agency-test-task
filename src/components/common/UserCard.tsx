import React from 'react';
// Images
import imgPlaceholder from "../../assets/images/photo-cover.svg";


const UserCard: React.FC = () => {
    return (
      <div className="user-card">
        <img src={imgPlaceholder} alt="User Avatar" className="user-card__img" />
        <p className="user-card__name">Salvador Stewart Flynn Thomas</p>
        <p className="user-card__position">Frontend Developer Frontend</p>
        <p className="user-card__email">frontend_develop@gmail.com</p>
        <p className="user-card__phone">+38 (098) 278 44 24</p>
      </div>
    );
  };
  
  export default UserCard;