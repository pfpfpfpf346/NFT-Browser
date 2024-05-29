import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/login';
import Account from './components/account'; // This is the new page component
import Home from './components/home';
import PictureButton from './components/PictureButton';

function App() {
  return (
    <div>
      <header>
        <nav class="navbar">
          <PictureButton src="/images/random-logos/nft-nexus.png" alt="Home" to="/"/>
          <ul class="nav-links">
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page content */}
        <Route path="/login" element={<Login />} /> {/* Login page content */}
        <Route path="/account" element={<Account />} /> {/* Account page content */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
      </Routes>
    </div>
  );
}

export default App;