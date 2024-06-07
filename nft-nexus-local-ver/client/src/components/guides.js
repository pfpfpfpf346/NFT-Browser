import React from 'react';
import { Link } from 'react-router-dom';
import './guides.css';

const Home = () => {
  return (
    <main>
      <h1 align="center">Guides</h1>
      <div class="text-body">
        <p>In this page, we will write comprehensive guides to ensure that beginners can navigate through the NFT ecosystem</p>
        <h2>What are NFTs?</h2>
        <p>NFTs, or Non-Fungible Tokens, represent unique digital assets stored on a blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum, which are interchangeable and have equal value, each NFT is distinct and cannot be replicated. They enable ownership, provenance, and scarcity in the digital world.</p>
        <h2>How do NFTs Work?</h2>
        <p>NFTs utilize blockchain technology and smart contracts to verify ownership and track transactions securely. Blockchain ensures transparency and immutability, while smart contracts automate NFT creation, ownership transfers, and royalty payments.</p>
        <h2>More to come:</h2>
        <p> - Easily navigate through the vast array of NFTs with our filter system</p>
        <p> - Gallery feature for collectors to show off</p>
        <p> - Step-by-step guides that even beginners can follow (e.g.: setting up wallet, buying/selling NFTs)</p>
        <p> - Analytics system for investors to pick the right NFTs as their vehicle of investment</p>
        <p> - and more...</p>
      </div>
    </main>
  );
};

export default Home;