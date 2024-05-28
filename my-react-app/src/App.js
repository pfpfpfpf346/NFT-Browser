import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/login';
import Account from './components/account'; // This is the new page component
import Home from './components/home';

function App() {
  return (
    <div>
      <header>
        <h1 className="heading">NFT Nexus</h1>
        <Link to="/home">
        <button>Home</button>
        </Link>
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