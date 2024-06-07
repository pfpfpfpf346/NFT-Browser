import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <h1 align="center">NFT Nexus</h1>
      <p align="center">Find NFTs easily using this intuitive website</p>
      <form class="center">
        <input type="text" />
        <button>Search</button>
      </form>
    </main>
  );
};

export default Home;