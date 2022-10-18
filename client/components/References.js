import React from "react";
// import { Button, Flex } from "@chakra-ui/react";
import Videos from "./Videos";
// import Audios from "./Audios";
import BackToTopButton from "./BackToTopButton";

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
    </div>
  );
};

export default References;
