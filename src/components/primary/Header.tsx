import React from "react";
// Images
import logo from "../../assets/images/logo.svg";
//Components
import Button from "../common/Button";

const Header: React.FC = () => {

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="header__content container">
        <img src={logo} alt="TestTask Logo" className="header__logo" />
        <nav className="header__nav">
          <Button onClick={() => scrollTo("users")}>Users</Button>
          <Button onClick={() => scrollTo("signup")}>Sign up</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
