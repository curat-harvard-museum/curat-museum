import React from "react";
import { Box, Center, Text, Icon, Link, Flex, Show } from "@chakra-ui/react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillYoutube,
  AiOutlineSmile,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <Show breakpoint="(min-width: 865px)">
        <Center>
          <Flex as={Text} fontSize="md">
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
          <Icon as={AiFillYoutube} w="35px" h="35px" />
        </Center>
      </Show>
      <Show breakpoint="(max-width: 865px)">
        <Center>
          <Flex as={Text} fontSize="xs" flexDirection="column">
            <div>☺2022 Fullstack Academy Capstone Project created by</div>
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

          <Icon as={AiFillYoutube} w="35px" h="35px" />
        </Center>
      </Show>
    </div>
  );
};

export default Footer;
