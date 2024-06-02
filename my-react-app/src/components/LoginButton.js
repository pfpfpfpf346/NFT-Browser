import React, { useState, useEffect } from 'react';

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage (or any other method)
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLoginClick = () => {
    // Redirect to login page
    window.location.href = '/login'
  };

  const handleAccountSettingsClick = () => {
    // Redirect to account settings page
    window.location.href = '/account-settings';
  };

  return (
    <button onClick={isLoggedIn ? handleAccountSettingsClick : handleLoginClick}>
      {isLoggedIn ? 'Account Settings' : 'Login'}
    </button>
  );
};

export default LoginButton;