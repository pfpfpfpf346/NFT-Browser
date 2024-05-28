import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <h2>introducing NFT Nexus</h2>
      <p>blah blah blah blah blah blah blah</p>
      <form>
        <input type="text" />
        <button>Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>Wash dishes</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Take a shower</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>Give a React.js workshop</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Link to navigate to the login page */}
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </main>
  );
};

export default Home;