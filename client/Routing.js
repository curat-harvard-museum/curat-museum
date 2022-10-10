import React, { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me, logout } from "./store";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import AllObjects from "./components/AllObjects";

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="login" element={<AuthForm />} />
        <Route path="/collection" element={<AllObjects />} />
        <Route path="signup" element={<AuthForm />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleClick = () => {
    dispatch(logout(navigate));
  };
  return (
    <div>
      <Navbar handleClick={handleClick} isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
};

export default Routing;
