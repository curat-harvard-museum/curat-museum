import React from "react";
import { Link } from "react-router-dom";
import { Flex, Grid, Image, Box, GridItem } from "@chakra-ui/react";
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
        className="logo"
        src="/assets/images/logo.png"
      />
    </Link>
    {isLoggedIn ? (
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* The navbar will show these links when user is logged in */}
        <GridItem pl="50%" colSpan={2}>
          <Link to="home">Home</Link>
        </GridItem>
        <GridItem colSpan={2}>
          <Link to="collection">View Collection</Link>
        </GridItem>
        <GridItem pl="10%" colSpan={2}>
          <Link to="visualizations">Visualizations</Link>
        </GridItem>
        {/* <input type="text" placeholder="Search the collection" /> */}
        <GridItem pl="10%" colSpan={2}>
          <Link to="references">References</Link>
        </GridItem>
        <GridItem pl="10%" colSpan={2}>
          <Link to="profile">Profile({auth.objects.length})</Link>
        </GridItem>
        <GridItem colSpan={2}>
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </GridItem>
      </Grid>
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
  </Flex>
);

export default Navbar;
