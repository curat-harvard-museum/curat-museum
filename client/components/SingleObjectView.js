import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { connect } from "react-redux";
import { updateUser, deleteArtwork } from "../store/auth";
import { Button, Show } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import {
  Box,
  Text,
  Grid,
  GridItem,
  Circle,
  Image,
  VStack,
  Flex,
  Divider,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack
} from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
  
  function SingleObjectView({ makeFavorite, auth, removeFavorite }) {
    const { id } = useParams();
    const { data } = useQuery(["query-single-object"], async () => {
      return await apiClient.get(
        `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
        );
      });
      const { isOpen, onOpen, onClose } = useDisclosure()
  


  const isFavorite = !!(auth.objects || []).find((o) => o.objectid === id * 1);

  return (
    <>
      <Grid
        h="100%"
        templateAreas={`"main main"
      "colors colors"
    "additional content"`}
        justifyContent="center"
        templateColumns="repeat(1, 1fr)"
        gap="1"
      >
        <GridItem marginTop="2rem" rowSpan={1} area={"main"}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1rem"
          >
            <Image
              className="single-image"
              maxH="100vh"
              src={`${data?.data.primaryimageurl}`}
              alt={`${data?.data.title}`}
            ></Image>
            {auth.username ? (
              isFavorite ? (
                <Icon as={MdFavorite} w={12} h={12} color='red.200' onClick={() => removeFavorite(data.data.objectid)}/>
              ) : (
                <Icon as={MdFavoriteBorder} w={12} h={12} color='red.200' onClick={() => makeFavorite(data.data)}/>
              )
            ) : (
              <>
      <Icon as={MdFavoriteBorder} w={12} h={12} color='red.200' onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
          bg='blackAlpha.300'
          backdropFilter='blur(10px)'/>
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please register to add artwork to your profile.
          </ModalBody>
          <ModalFooter>
            <Stack spacing={20} direction='row' align='center'>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Link to="/login">
              <Button colorScheme='gray' mr={3}>Log In to Like</Button>
            </Link>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
            )}
          </Box>
        </GridItem>

        <GridItem area={"colors"}>
          <Flex justifyContent="space-between" flexWrap="wrap" gap="0.5rem">
            {data?.data.colors
              ? data?.data.colors.map((color) => (
                  <Circle
                    key={color.color}
                    width="6rem"
                    height="6rem"
                    bg={`${color.color}`}
                  ></Circle>
                ))
              : null}
          </Flex>
        </GridItem>

        <Show breakpoint="(max-width: 1368px)">
          <VStack spacing={1} align="stretch">
            {data?.data.images ? (
              <>
                <GridItem
                  area={"additional"}
                  justifySelf="center"
                  alignSelf="center"
                >
                  <Splide
                    aria-label="Related Images"
                    options={{
                      perPage: 1,
                      type: "loop",
                      width: "50rem",
                      height: "auto",
                      speed: 2000,
                    }}
                  >
                    {data?.data.images
                      ? data?.data.images.map((image) => (
                          <SplideSlide key={image.idsid}>
                            <Image
                              src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
                            />
                          </SplideSlide>
                        ))
                      : null}
                  </Splide>
                </GridItem>
              </>
            ) : null}

            <GridItem area={"content"} justifySelf="center" alignSelf="center">
              {data?.data.people ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Artist
                  </Text>
                  <Divider />

                  <Text>{data?.data.people[0]?.name}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.title ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Title
                  </Text>
                  <Divider />

                  <Text>{data?.data.titles[0]?.title}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.century ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Century
                  </Text>
                  <Divider />
                  <Text>{data?.data.century}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.dated ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Date of Completion
                  </Text>
                  <Divider />
                  <Text>{data?.data.dated}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.culture ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Culture
                  </Text>
                  <Divider />
                  <Text>{data?.data.culture ? data?.data.culture : null}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.classification ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Classification
                  </Text>
                  <Divider />
                  <Text>{data?.data.classification}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.medium ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Medium/Technique
                  </Text>
                  <Divider />
                  <Text>{data?.data.medium}</Text>
                  <Text>
                    {data?.data.technique ? data?.data.technique : null}
                  </Text>
                </>
              ) : null}

              {data?.data.gallery ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Location
                  </Text>
                  <Divider />
                  <Text key={data?.data.gallery.id}>
                    Level {data?.data.gallery.floor}, {data?.data.gallery.name}
                    {data?.data.gallery.number}
                  </Text>
                </>
              ) : null}

              <Box height="1rem" />

              {data?.data.exhibitions ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Associated Exhibitions
                  </Text>
                  <Divider />
                  {data?.data.exhibitions.map((exhibition) => (
                    <Text key={exhibition.exhibitionid}>
                      {exhibition.title}
                    </Text>
                  ))}
                </>
              ) : null}

              <Box height="1rem" />
            </GridItem>
          </VStack>
        </Show>

        <Show breakpoint="(min-width: 1368px)">
          {data?.data.images ? (
            <GridItem
              area={"additional"}
              justifySelf="center"
              alignSelf="center"
              paddingRight="5rem"
            >
              <Splide
                aria-label="Related Images"
                options={{
                  perPage: 1,
                  type: "loop",
                  width: "35rem",
                  height: "auto",
                  speed: 2000,
                }}
              >
                {data?.data.images
                  ? data?.data.images.map((image) => (
                      <SplideSlide key={image.idsid}>
                        <Image
                          src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
                        />
                      </SplideSlide>
                    ))
                  : null}
              </Splide>
            </GridItem>
          ) : null}

          <GridItem area={"content"} justifySelf="center" alignSelf="center">
            <VStack spacing={1} align="stretch">
              {data?.data.people ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Artist
                  </Text>
                  <Divider />

                  <Text>{data?.data.people[0]?.name}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.title ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Title
                  </Text>
                  <Divider />

                  <Text>{data?.data.titles[0]?.title}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.century ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Century
                  </Text>
                  <Divider />
                  <Text>{data?.data.century}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.dated ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Date of Completion
                  </Text>
                  <Divider />
                  <Text>{data?.data.dated}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.culture ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Culture
                  </Text>
                  <Divider />
                  <Text>{data?.data.culture ? data?.data.culture : null}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.classification ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Classification
                  </Text>
                  <Divider />
                  <Text>{data?.data.classification}</Text>
                </>
              ) : null}
              <Box height="1rem" />

              {data?.data.medium ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Medium/Technique
                  </Text>
                  <Divider />
                  <Text>{data?.data.medium}</Text>
                  <Text>
                    {data?.data.technique ? data?.data.technique : null}
                  </Text>
                </>
              ) : null}

              {data?.data.gallery ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Location
                  </Text>
                  <Divider />
                  <Text key={data?.data.gallery.id}>
                    Level {data?.data.gallery.floor}, {data?.data.gallery.name}
                    {data?.data.gallery.number}
                  </Text>
                </>
              ) : null}

              <Box height="1rem" />

              {data?.data.exhibitions ? (
                <>
                  <Text as="b" color="gray.300" fontSize="1.25rem">
                    Associated Exhibitions
                  </Text>
                  <Divider />
                  {data?.data.exhibitions.map((exhibition) => (
                    <Text key={exhibition.exhibitionid}>
                      {exhibition.title}
                    </Text>
                  ))}
                </>
              ) : null}

              <Box height="1rem" />
            </VStack>
          </GridItem>
        </Show>
      </Grid>
    </>
  );
}

const mapDispatch = (dispatch) => {
  return {
    makeFavorite: (artwork) => {
      dispatch(updateUser(artwork));
    },
    removeFavorite: (favoriteId) => {
      dispatch(deleteArtwork(favoriteId));
    },
  };
};

export default connect((state) => state, mapDispatch)(SingleObjectView);
