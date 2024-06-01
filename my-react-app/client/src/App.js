import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/login';
import Account from './components/account'; // This is the new page component
import Home from './components/home';
import Register from './components/register';
import PictureButton from './components/PictureButton';
import LoginButton from './components/LoginButton';


function App() {
  return (
    <div>
      <header>
        <nav class="navbar">
          <PictureButton src="/images/random-logos/nft-nexus.png" alt="Home" to="/"/>
          <ul class="nav-links">
            <li><a href="/browse">Browse NFTs</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/login">Login</a></li> {/* change to login button */}
          </ul>
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page content */}
        <Route path="/login" element={<Login />} /> {/* Login page content */}
        <Route path="/account" element={<Account />} /> {/* Account page content */}
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
      </Routes>
    </div>
  );
}

export default App;