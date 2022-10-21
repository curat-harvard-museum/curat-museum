import React from "react";
import { Link } from "react-router-dom";
import { Flex, Grid, Image, Box, GridItem } from "@chakra-ui/react";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <Flex align="center" justify="space-between">
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
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {/* The navbar will show these links when user is logged in */}
        <GridItem pl="50%" colSpan={1}>
          <Link to="home">Home</Link>
        </GridItem>
        <GridItem colSpan={1}>
          <Link to="collection">View Collection</Link>
        </GridItem>
        <GridItem pl="10%" colSpan={1}>
          <Link to="visualizations">Visualizations</Link>
        </GridItem>
        {/* <input type="text" placeholder="Search the collection" /> */}
        <GridItem pl="10%" colSpan={1}>
          <Link to="references">References</Link>
        </GridItem>
        <GridItem pl="10%" colSpan={1}>
          <Link to="profile">Profile({auth.objects.length})</Link>
        </GridItem>
        <GridItem colSpan={1}>
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
    <hr />
  </Flex>
);
export default Navbar;
