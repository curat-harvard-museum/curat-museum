import React from "react";
import Exhibitions from "./Exhibitions";
import BackToTopButton from "./BackToTopButton";
import {
  Divider,
  Image,
  Show,
  Text,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <div className="bg-container">
        <Image src="/assets/images/curat-background.png" alt="" w="100%" />
        <Show breakpoint="(min-width: 1441px)">
          <Text
            className="bg-text"
            as="b"
            fontSize="3xl"
            w="40%"
            h="20%"
            alignItems="center"
          >
            Curat your next museum trip with us and discover artwork more
            deeply.
          </Text>
        </Show>

        <Show breakpoint="(max-width: 1440px)">
          <Text
            className="bg-text"
            as="b"
            fontSize="sm"
            w="40%"
            h="20%"
            alignItems="center"
          >
            Curat your next museum trip with us and discover artwork more
            deeply.
          </Text>
        </Show>
      </div>
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
