  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { getToken, isAuthenticated } from '../utils/auth';

  const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [content, setContent] = useState('home');

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

    const renderContent = () => {
      switch (content) {
        case 'dashboard':
          return <Dashboard />;
        case 'owned-nfts':
          return <Owned_NFTs />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div class="account-header">
        <h1 class='account-info'>Welcome, {user ? user.username : '<undefined>'}!</h1> {/* Display username */}
        <button class='account-buttons' onClick={() => setContent('dashboard')}>Account Dashboard</button>
        <button class='account-buttons' onClick={() => setContent('owned-nfts')}>Owned NFTs</button>
        <button class='account-buttons'>Favourites</button>
        <button class='account-buttons'>Settings</button>
      </div>
    );
  };

  const Dashboard = () => (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Dashboard content.</p>
    </div>
  );

  const Owned_NFTs = () => (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Owned NFTs content.</p>
    </div>
  );

  export default Account;