import React from "react";
//Components
import Button from "../../common/Button";

const IntroSection: React.FC = () => {

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="intro-section">
      <div className="intro-section__overlay">
        <div className="intro-section__content container">
          <h1 className="intro-section__title">
            Test assignment for front-end developer
          </h1>
          <p className="intro-section__text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button onClick={() => scrollTo("signup")}>Sign up</Button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
