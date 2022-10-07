import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        {/* <Route path="/collection" element={<AllObjects />} /> */}
      </Route>
    </Routes>
  );
}

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Routing;
