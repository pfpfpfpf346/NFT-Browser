import React from 'react';

const Sidebar = ({ onSidebarClick }) => {
  return (
    <div className="sidebar">
      <h2>Contents</h2>
      <button onClick={() => onSidebarClick('Homepage')}>Homepage</button>
      <button onClick={() => onSidebarClick('Wallet')}>Setting up wallet</button>
      <button onClick={() => onSidebarClick('Buying Selling')}>Buying and selling NFTs</button>
    </div>
  );
};

export default Sidebar;