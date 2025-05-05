import React from 'react';
//Components
import IntroSection from './Sections/IntroSection';
import UsersSection from './Sections/UsersSection';
import FormSection from './Sections/FormSection';

const Main: React.FC = () => {
  return (
    <main className="main">
      <IntroSection />
      <UsersSection />
      <FormSection />
    </main>
  );
};

export default Main;