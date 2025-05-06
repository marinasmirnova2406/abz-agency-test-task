import React from "react";
//Components
import { RegisterForm } from "../../forms/RegisterForm";

const FormSection: React.FC = () => {
  return (
    <section id="signup" className="form-section">
      <div className="form-section__content container">
        <RegisterForm />
      </div>
    </section>
  );
};

export default FormSection;
