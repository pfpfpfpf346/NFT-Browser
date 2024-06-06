  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { getToken, isAuthenticated } from '../utils/auth';

  const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

      const fetchUserData = async () => {
        try {
          const token = getToken();
          const response = await axios.get('http://localhost:5000/api/account', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
          navigate('/login');
        }
      };

      fetchUserData();
    }, [navigate]);

    if (!user) return <div>Loading...</div>;

    return (
      <div class="account-header">
        <h1 class='account-info'>Welcome, {user ? user.username : '<undefined>'}!</h1> {/* Display username */}
        <button class='account-buttons'>Account Dashboard</button>
        <button class='account-buttons'>Owned NFTs</button>
        <button class='account-buttons'>Favourites</button>
      </div>
    );
  };

  export default Account;