import React, { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me, logout } from "./store";
import { Show, Box, Flex } from "@chakra-ui/react";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import AllObjects from "./components/FullCollection";
import SingleObjectView from "./components/SingleObjectView";
import References from "./components/References";
import Visualizations from "./components/Visualizations";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="*" element={<Layout />}>
        <Route path="login" element={<AuthForm />} />
        <Route path="collection" element={<AllObjects />} />
        <Route path="register" element={<AuthForm />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="object/:id" element={<SingleObjectView />} />
        <Route path="references" element={<References />} />
        <Route path="visualizations" element={<Visualizations />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleClick = () => {
    dispatch(logout(navigate));
  };
  return (
    <Flex justifyContent="center">
      <Box maxWidth="1440px" px="2rem" marginBottom="4rem">
        <Show breakpoint="(min-width: 1033px)">
          <Navbar
            handleClick={handleClick}
            isLoggedIn={isLoggedIn}
            auth={auth}
          />
        </Show>
        <Show breakpoint="(max-width: 1033px)">
          <NavbarMobile
            handleClick={handleClick}
            isLoggedIn={isLoggedIn}
            auth={auth}
          />
        </Show>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Routing;
