import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/login';
import Account from './components/account'; // This is the new page component
import Home from './components/home';
import Register from './components/register';
import PictureButton from './components/PictureButton';
import AuthButton from './components/AuthButton';
import { isAuthenticated } from './utils/auth';

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <header>
        <nav class="navbar">
          <PictureButton src="/images/random-logos/nft-nexus.png" alt="Home" to="/"/>
          <ul class="nav-links">
            <li><a href="/browse">Browse NFTs</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/account">My Profile</a></li>
            <li><AuthButton /></li> {/* Use the new AuthButton component */} {/* change to login button */}
          </ul>
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page content */}
        <Route path="/login" element={<Login />} /> {/* Login page content */}
        <Route path="/account" element={<PrivateRoute element={<Account />} />} /> {/* Account page content */}
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
      </Routes>
    </div>
  );
}

export default App;