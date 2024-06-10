import React, { useState } from 'react';
import { processData } from '../utils/api';
import Results from './wallet-explorer-components/results';

const WalletExplorer = () => {
  const [output, setOutput] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const handleProcessData = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const data = { walletAddress };
      const response = await processData(data);
      console.log('Processed data:', response);
      setOutput(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <p align="center">Enter wallet address to display NFTs in a wallet:</p>
      <form className="center" onSubmit={handleProcessData}>
        <input 
          type="text" 
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button type="submit">Search</button>
        <pre>output: {JSON.stringify(output, null, 2)}</pre>
      </form>
    </main>
  );
};

export default WalletExplorer;