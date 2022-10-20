import React from "react";
import { Link } from "react-router-dom";
import { Flex, Spacer, Image, Box } from "@chakra-ui/react";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <Flex align="center" justify="space-between">
    <Link to="home">
      <Image
        marginBottom="2rem"
        marginTop="2rem"
        marginLeft="3rem"
        boxSize="130px"
        className="logo"
        src="/assets/images/logo.png"
      />
    </Link>
    {isLoggedIn ? (
      <Flex justify="space-between">
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
      </Flex>
    ) : (
      <Box>
        {/* The navbar will show these links when user is !loggedin */}
        <Link to="home">Home</Link>
        <Link to="collection">View Collection</Link>
        <Link to="visualizations">Visualizations</Link>
        {/* <input type="text" placeholder="Search the collection" /> */}
        <Link to="references">References</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </Box>
    )}
  </Flex>
);

export default Navbar;
