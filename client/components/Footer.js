import React from "react";
import { Center, Text, Icon, Link, Flex, Show } from "@chakra-ui/react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillYoutube,
  AiOutlineSmile,
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <Show breakpoint="(min-width: 973px)">
        <Center>
          <Flex>
            <Flex alignItems="center">
              <Icon as={AiOutlineSmile} w="16px" h="16px" />
              2022 Fullstack Academy Capstone Project created by&nbsp;
            </Flex>
            <Flex alignItems="center">
              Jasmine Cheung
              <Link href="https://www.linkedin.com/in/cheungjasmine/">
                <Icon as={AiFillLinkedin} w="25px" h="25px" />
              </Link>
              | Jordyn Rector
              <Link href="https://www.linkedin.com/in/jordynrector/">
                <Icon as={AiFillLinkedin} w="25px" h="25px" />
              </Link>
              | Joyce Wong
              <Link href="https://www.linkedin.com/in/joyce-k-wong/">
                <Icon as={AiFillLinkedin} w="25px" h="25px" />
              </Link>
            </Flex>
          </Flex>
        </Center>
        <br></br>
        <Center>
          <Link href="https://github.com/curat-harvard-museum/curat-museum">
            <Icon as={AiFillGithub} w="35px" h="35px" />
          </Link>
          <Link href="https://www.youtube.com/watch?v=ZquYFxI1TxA">
            <Icon as={AiFillYoutube} w="35px" h="35px" />
          </Link>
        </Center>
      </Show>

      <Show breakpoint="(max-width: 973px)">
        <Center>
          <Flex flexDirection="column">
            ☺2022 Fullstack Academy Capstone Project created by
            <Flex>
              Jasmine Cheung
              <Link href="https://www.linkedin.com/in/cheungjasmine/">
                <Icon as={AiFillLinkedin} w="20px" h="20px" />
              </Link>
              Jordyn Rector
              <Link href="https://www.linkedin.com/in/jordynrector/">
                <Icon as={AiFillLinkedin} w="20px" h="20px" />
              </Link>
              Joyce Wong
              <Link href="https://www.linkedin.com/in/joyce-k-wong/">
                <Icon as={AiFillLinkedin} w="20px" h="20px" />
              </Link>
            </Flex>
          </Flex>
        </Center>
        <br></br>
        <Center>
          <Link href="https://github.com/curat-harvard-museum/curat-museum">
            <Icon as={AiFillGithub} w="35px" h="35px" />
          </Link>
          <Link href="https://www.youtube.com/watch?v=ZquYFxI1TxA">
            <Icon as={AiFillYoutube} w="35px" h="35px" />
          </Link>
        </Center>
      </Show>
    </>
  );
};

export default Footer;
