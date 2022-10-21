import React from "react";
// import { Button, Flex } from "@chakra-ui/react";
import Videos from "./Videos";
// import Audios from "./Audios";
import BackToTopButton from "./BackToTopButton";
import Footer from "./Footer";
import { Divider } from "@chakra-ui/react";

const References = (props) => {
  return (
    <div className="reference-header">
      {/* <Flex justifyContent="center" alignItems="center">
        <Button
          px={4}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.300",
          }}
        >
          <a href="#videos">Videos</a>
        </Button>
        <Button
          px={4}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.300",
          }}
        >
          <a href="#audios">Audios</a>
        </Button>
      </Flex> */}

      <Videos />
      {/* <Audios /> */}
      <BackToTopButton />
      <br></br>
      <Divider />
      <br></br>
      <Footer />
    </div>
  );
};

export default References;
