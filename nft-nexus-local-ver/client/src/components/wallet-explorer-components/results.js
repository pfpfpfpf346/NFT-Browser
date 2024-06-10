// src/components/MainContent.js
import React from 'react';

const Results = ({ content }) => {
  let Component;

  console.log(content);

  /*
  switch (content) {
    case false:
      Component = HomeContent;
      break;
    case true:
      Component = WalletContent;
      break;
    default:
      Component = HomeContent;
  }
  */

  return (
    <div className="body">
      <p>wallet: {content}</p>
    </div>
  );
};

export default Results;