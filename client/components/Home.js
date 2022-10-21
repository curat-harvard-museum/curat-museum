import React from "react";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";
import { Divider, Image, Show, Text } from "@chakra-ui/react";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <div className="bg-container">
        <Image src="/assets/images/curat-background.png" alt="" w="100%" />
        <div className="bg-text">
          <Text as="b" fontSize="2xl">
            Curāt your next museum trip with us and discover artwork more
            deeply.
          </Text>
        </div>
        <Show breakpoint="(max-width: 695px)">
          <Text as="b" fontSize="md">
            Curāt your next museum trip with us and discover artwork more
            deeply.
          </Text>
        </Show>
      </div>
      <br></br>
      <Divider />
      <br></br>
      <Exhibitions />
      <br></br>
      <Divider />
      <br></br>
      <Footer />
      <Show breakpoint="(max-width: 658px)">
        <BackToTopButton />
      </Show>
    </div>
  );
};

export default Home;
