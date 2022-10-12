import React from "react";
import { useSelector } from "react-redux";
import Exhibitions from "./Exhibitions";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      {/* <h3>Welcome, {username}</h3> */}
      <img
        src="/assets/images/harvardgallery.jpeg"
        alt=""
        style={{ width: "100%" }}
      />
      <hr />
      <br></br>
      <Exhibitions />
    </div>
  );
};

export default Home;
