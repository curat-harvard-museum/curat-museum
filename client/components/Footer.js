import React from "react";
import { Box, Center, Text, Icon, Link } from "@chakra-ui/react";
import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <Center>
        <Text fontSize="lg">
          ©2022 Fullstack Academy Capstone Project created by Jasmine
          <Link href="https://www.linkedin.com/in/cheungjasmine/">
            <Icon as={AiFillLinkedin} w="25px" h="25px" />
          </Link>
          , Jordyn
          <Link href="https://www.linkedin.com/in/jordynrector/">
            <Icon as={AiFillLinkedin} w="25px" h="25px" />
          </Link>
          , and Joyce
          <Link href="https://www.linkedin.com/in/joyce-k-wong/">
            <Icon as={AiFillLinkedin} w="25px" h="25px" />
          </Link>
        </Text>
      </Center>
      <br></br>
      <Center>
        <Link href="https://github.com/curat-harvard-museum/curat-museum">
          <Icon as={AiFillGithub} w="35px" h="35px" />
        </Link>
        <Icon as={AiFillYoutube} w="35px" h="35px" />
      </Center>
    </div>
  );
};

export default Footer;
