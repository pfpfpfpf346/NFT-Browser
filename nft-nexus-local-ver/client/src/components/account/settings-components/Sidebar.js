import React from 'react';

const Sidebar = ({ onSidebarClick }) => {
  return (
    <div className="sidebar">
      <h2>Settings</h2>
      <div className='sidebar-buttons'>
        <button onClick={() => onSidebarClick('pd')}>Personal Details</button>
      </div>
    </div>
  );
};

export default Sidebar;