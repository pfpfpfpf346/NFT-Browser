// src/components/MainContent.js
import React from 'react';
import HomeContent from './HomeContent';
import WalletContent from './WalletContent';

const MainContent = ({ content }) => {
  let Component;

  switch (content) {
    case 'Home':
      Component = HomeContent;
      break;
    case 'Wallet':
      Component = WalletContent;
      break;
    default:
      Component = HomeContent;
  }

  return (
    <div className="body">
      <Component />
    </div>
  );
};

export default MainContent;