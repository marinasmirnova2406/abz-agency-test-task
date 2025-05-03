import React from 'react';
//Components
import Button from '../common/Button';
import IntroSection from './Sections/IntroSection';
import UsersSection from './Sections/UsersSection';

const Main: React.FC = () => {
  return (
    <main className="main">
      <IntroSection />
      <UsersSection />
    </main>
  );
};

export default Main;