import React from "react";
import { useSelector } from "react-redux";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";

const Home = (props) => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      <img
        src="/assets/images/harvardgallery.jpeg"
        alt=""
        style={{ width: "100%" }}
      />
      <hr />
      <br></br>
      <Exhibitions />
      <BackToTopButton />
    </div>
  );
};

export default Home;
