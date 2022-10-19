import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  Flex,
  Button,
  MenuList,
  Image,
  MenuItem,
  Box,
  IconButton,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

const NavbarMobile = ({ handleClick, isLoggedIn, auth }) => (
  <>
    {isLoggedIn ? (
      <Flex justifyContent="space-around">
        <Menu>
          <MenuButton
            marginTop="2rem"
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            marginBottom="2rem"
          />
          <MenuList>
            {/* The navbar will show these links when user is logged in */}
            <MenuItem as={Link} to={"home"}>
              Home
            </MenuItem>
            <MenuItem as={Link} to={"collection"}>
              View Collection
            </MenuItem>
            <MenuItem as={Link} to={"visualizations"}>
              Visualizations
            </MenuItem>
            {/* <input type="text" placeholder="Search the collection" /> */}
            <MenuItem as={Link} to={"references"}>
              References
            </MenuItem>
            <MenuItem as={Link} to={"profile"}>
              Profile({auth.objects.length})
            </MenuItem>
          </MenuList>
        </Menu>
        <Box marginTop="2rem" as={Link} to={"home"}>
          <Image
            boxSize="50px"
            className="logo"
            src="/assets/images/logo.png"
          />
        </Box>
        <Button
          marginTop="2rem"
          size="sm"
          as={Link}
          to="#"
          onClick={handleClick}
        >
          Logout
        </Button>
      </Flex>
    ) : (
      <Flex justifyContent="space-around">
        <Menu>
          <MenuButton
            marginTop="2rem"
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            marginBottom="2rem"
          />
          <MenuList>
            {/* The navbar will show these MenuItems when user is !loggedin */}
            <MenuItem as={Link} to={"home"}>
              Home
            </MenuItem>
            <MenuItem as={Link} to={"collection"}>
              View Collection
            </MenuItem>
            <MenuItem as={Link} to={"visualizations"}>
              Visualizations
            </MenuItem>
            {/* <input type="text" placeholder="Search the collection" /> */}
            <MenuItem as={Link} to={"references"}>
              References
            </MenuItem>
            <MenuItem as={Link} to={"register"}>
              Register
            </MenuItem>
          </MenuList>
        </Menu>
        <Box marginTop="2rem" as={Link} to={"home"}>
          <Image
            boxSize="50px"
            className="logo"
            src="/assets/images/logo.png"
          />
        </Box>
        <Button marginTop="2rem" size="sm" as={Link} to={"login"}>
          Login
        </Button>
      </Flex>
    )}
  </>
);

export default NavbarMobile;
