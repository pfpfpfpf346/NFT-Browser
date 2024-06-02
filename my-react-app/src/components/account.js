import React from 'react';
import { useLocation } from 'react-router-dom';

const Account = () => {
  const location = useLocation();
  const { state } = location;
  const { message } = state || {};

  return (
    <div>
      <h1>Welcome {message ? message : 'Guest'} to their account!</h1>
    </div>
    
  );
};

export default Account;