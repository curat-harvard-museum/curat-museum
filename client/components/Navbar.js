import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div className="logo-navbar">
    <Link to="home">
      <img className="logo" src="/assets/images/logo.png" />
    </Link>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links when user is logged in */}
          <Link to="home">Home</Link>
          <Link to="collection">View Collection</Link>
          <Link to="visualizations">Visualizations</Link>
          {/* <input type="text" placeholder="Search the collection" /> */}
          <Link to="references">References</Link>
          <Link to="profile">Profile({auth.objects.length})</Link>
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links when user is !loggedin */}
          <Link to="home">Home</Link>
          <Link to="collection">View Collection</Link>
          <Link to="visualizations">Visualizations</Link>
          {/* <input type="text" placeholder="Search the collection" /> */}
          <Link to="references">References</Link>
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

export default Navbar;
