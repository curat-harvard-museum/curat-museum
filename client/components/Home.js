import React from "react";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";
import { Divider } from "@chakra-ui/react";

const Home = (props) => {
  return (
    <div>
      <img
        src="/assets/images/curat-background.png"
        alt=""
        style={{ width: "100%" }}
      />
      <br></br>
      <Divider />
      <br></br>
      <Exhibitions />
      <BackToTopButton />
    </div>
  );
};

export default Home;
