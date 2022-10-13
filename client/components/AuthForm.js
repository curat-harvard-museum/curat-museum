import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authenticate } from "../store";
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  Avatar,
  Text,
} from "@chakra-ui/react";

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, email, password, formName));
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.20"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="gray.500" />
        <Heading color="black.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "500px" }}>
          <form onSubmit={handleSubmit} name={location?.slice(1)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <br></br>
              <div>
                <label htmlFor="username">
                  <Text fontSize="md">Username</Text>
                </label>
                <Input name="username" type="text" />
              </div>
              <div>
                <label htmlFor="email">
                  <Text fontSize="md">Email</Text>
                </label>
                <Input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <Text fontSize="md">Password</Text>
                </label>
                <Input name="password" type={show ? "text" : "password"} />
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </div>
              <br></br>
              <div>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  width="full"
                >
                  {location === "/login" ? "Login" : "Register"}
                </Button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthForm;
