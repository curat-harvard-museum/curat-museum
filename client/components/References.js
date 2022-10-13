import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import Videos from "./Videos";
import Audios from "./Audios";

/**
 * COMPONENT
 */
const References = (props) => {
  return (
    <div className="reference-header">
      <Flex justifyContent="center" alignItems="center">
        <Button
          /* flex={1} */
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
          /* flex={1} */
          px={4}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.300",
          }}
        >
          <a href="#audios">Audios</a>
        </Button>
      </Flex>

      <Videos />
      <Audios />
    </div>
  );
};

export default References;
