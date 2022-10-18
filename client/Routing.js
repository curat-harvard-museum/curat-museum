import React, { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me, logout } from "./store";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import AllObjects from "./components/FullCollection";
import SingleObjectView from "./components/SingleObjectView";
import References from "./components/References";

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
      </Route>
    </Routes>
  );
}

const Layout = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { auth } = useSelector(state => state);
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
      <Navbar handleClick={handleClick} isLoggedIn={isLoggedIn} auth={auth} />
      <Outlet />
    </div>
  );
};

export default Routing;
