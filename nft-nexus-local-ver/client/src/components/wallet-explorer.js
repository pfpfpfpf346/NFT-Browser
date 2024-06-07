import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletExplorer = () => {
    return (
      <main>
        <p align="center">Enter wallet address to display NFTs in a wallet:</p>
        <form align="center">
          <input type="text" />
          <button>Search</button>
        </form>
      </main>
    );
  };
  
  export default WalletExplorer;