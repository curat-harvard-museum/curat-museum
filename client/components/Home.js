import React from "react";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";
import { Divider, Image } from "@chakra-ui/react";

const Home = (props) => {
  return (
    <div>
      <Image
        src="/assets/images/curat-background.png"
        alt=""
        w="100%"
        marginLeft="5vw"
        marginRight="5vw"
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
