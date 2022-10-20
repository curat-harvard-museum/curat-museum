import React from "react";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";
import { Divider, Image, Show } from "@chakra-ui/react";

const Home = (props) => {
  return (
    <div>
      <Image src="/assets/images/curat-background.png" alt="" w="100%" />
      <br></br>
      <Divider />
      <br></br>
      <Exhibitions />
      <Show breakpoint="(max-width: 658px)">
        <BackToTopButton />
      </Show>
    </div>
  );
};

export default Home;
