import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/react";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <Flex align="center">
    <Link to="home">
      <Image
        marginBottom="2rem"
        marginTop="2rem"
        marginLeft="3rem"
        width="130px"
        height="auto"
        // boxSize="130px"
        className="logo"
        src="/assets/images/logo.png"
      />
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links when user is logged in */}
          <Link to="home">Home</Link>
          <Link to="collection">View Collection</Link>
          <Link to="visualizations">Visualizations</Link>
          {/* <input type="text" placeholder="Search the collection" /> */}
          <Link to="references">References</Link>
          <Link to="profile">Profile({auth.objects.length})</Link>
          <Link to="home" onClick={handleClick}>
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
  </Flex>
);

export default Navbar;
