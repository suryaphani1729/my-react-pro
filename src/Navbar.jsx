import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* Link component points to the path defined in <Route> */}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;