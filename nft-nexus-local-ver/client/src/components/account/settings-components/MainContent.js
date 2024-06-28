// settings-components/MainContent.js
import React from 'react';
import PersonalDetails from './PersonalDetails';

const MainContent = ({ content }) => {
  let Component;

  switch (content) {
    case 'pd':
      Component = PersonalDetails;
      break;
    default:
      Component = PersonalDetails;
  }

  return (
    <div className="settings-body">
      <Component />
    </div>
  );
};

export default MainContent;