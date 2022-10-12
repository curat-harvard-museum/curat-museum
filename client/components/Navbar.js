import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Curat</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links when user is logged in */}
          <Link to="/home">Home</Link>
          <Link to="collection">View Collection</Link>
          <Link to="colorSearch">colorSearch</Link>
          <input type="text" placeholder="Search the collection" />
          <Link to="/profile">Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links when user is !loggedin */}
          <Link to="/home">Home</Link>
          <Link to="collection">View Collection</Link>
          <Link to="colorSearch">colorSearch</Link>
          <input type="text" placeholder="Search the collection" />
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

export default Navbar;
