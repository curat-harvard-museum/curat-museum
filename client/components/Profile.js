import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useQuery } from "react-query";

import { useParams, Link } from "react-router-dom";
import apiClient from "../../http-common";
import {
  Heading,
  Image,
  Box,
  Badge,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Divider,
  SimpleGrid,
  Icon,
  Text,
} from "@chakra-ui/react";
import { deleteArtwork, updateVisit } from "../store/auth";
import BackToTopButton from "./BackToTopButton";
import Footer from "./Footer";
import { MdFavorite } from "react-icons/md";

const Profile = ({ removeFavorite, updateVisit }) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  return (
    <>
      <Heading as="h4" size="md">
        Welcome, {username}
      </Heading>
      {favorites?.length > 0 ? (
        <Tabs variant="soft-rounded" colorScheme="gray">
          <TabList>
            <Tab>To Visit</Tab>
            <Tab>Visited</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div>
                <SimpleGrid columns={{ base: 1, md: 2, md: 3 }} gap={5}>
                  {favorites
                    ?.filter(
                      (favorite) => favorite["user-object"].isVisited === false
                    )
                    .map((favorite) => (
                      <div key={favorite.objectid}>
                        <Flex flexWrap="wrap">
                          <Box
                            boxSize="auto"
                            minW="auto"
                            maxW="auto"
                            mx="auto"
                            borderWidth="1px"
                            overflow="hidden"
                          >
                            <Link to={`/object/${favorite.objectid}`}>
                              <Image
                                src={favorite.primaryimageurl}
                                alt={favorite.title}
                                margin-left="auto"
                                margin-right="auto"
                                width="100%"
                              />
                            </Link>
                            <Box p="6">
                              <Box alignItems="baseline">
                                <Badge
                                  borderRadius="full"
                                  px="2"
                                  colorScheme="gray"
                                >
                                  Favorite
                                </Badge>
                                <Link to={`/object/${favorite.objectid}`}>
                                  <Box
                                    maxW="sm"
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                  >
                                    {favorite.artist}
                                  </Box>
                                </Link>
                              </Box>
                              <Link to={`/object/${favorite.objectid}`}>
                                <Box
                                  mt="1"
                                  fontWeight="semibold"
                                  as="h4"
                                  lineHeight="tight"
                                >
                                  {favorite.title}
                                </Box>
                              </Link>
                              <Link to={`/object/${favorite.objectid}`}>
                                <Box>
                                  {favorite.description}
                                  <Box
                                    as="span"
                                    color="gray.600"
                                    fontSize="sm"
                                  ></Box>
                                </Box>
                              </Link>
                              <br />

                              <Flex
                                flexWrap="nowrap"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Box mt="2">
                                  <Icon
                                    as={MdFavorite}
                                    w={10}
                                    h={10}
                                    color="red.200"
                                    onClick={() =>
                                      removeFavorite(favorite.objectid)
                                    }
                                  />
                                </Box>
                                <Box mt="2">
                                  <Checkbox
                                    colorScheme="blackAlpha"
                                    defaultunchecked="true"
                                    size="lg"
                                    onChange={() => updateVisit(favorite.id)}
                                  >
                                    Visited
                                  </Checkbox>
                                </Box>
                              </Flex>
                            </Box>
                          </Box>
                        </Flex>
                      </div>
                    ))}
                </SimpleGrid>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <SimpleGrid columns={{ base: 1, md: 2, md: 3 }} gap={5}>
                  {favorites
                    ?.filter(
                      (favorite) => favorite["user-object"].isVisited === true
                    )
                    .map((favorite) => (
                      <div key={favorite.objectid}>
                        <Flex flexWrap="wrap">
                          <Box
                            boxSize="auto"
                            minW="auto"
                            maxW="auto"
                            mx="auto"
                            borderWidth="1px"
                            overflow="hidden"
                          >
                            <Link to={`/object/${favorite.objectid}`}>
                              <Image
                                src={favorite.primaryimageurl}
                                alt={favorite.title}
                                margin-left="auto"
                                margin-right="auto"
                                width="100%"
                              />
                            </Link>
                            <Box p="6">
                              <Box alignItems="baseline">
                                <Badge
                                  borderRadius="full"
                                  px="2"
                                  colorScheme="gray"
                                >
                                  Favorite
                                </Badge>
                                <Link to={`/object/${favorite.objectid}`}>
                                  <Box
                                    maxW="sm"
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                  >
                                    {favorite.artist}
                                  </Box>
                                </Link>
                              </Box>
                              <Link to={`/object/${favorite.objectid}`}>
                                <Box
                                  mt="1"
                                  fontWeight="semibold"
                                  as="h4"
                                  lineHeight="tight"
                                >
                                  {favorite.title}
                                </Box>
                              </Link>
                              <Link to={`/object/${favorite.objectid}`}>
                                <Box>
                                  {favorite.description}
                                  <Box
                                    as="span"
                                    color="gray.600"
                                    fontSize="sm"
                                  ></Box>
                                </Box>
                              </Link>
                              <br />

                              <Flex
                                flexWrap="nowrap"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Box mt="2">
                                  <Icon
                                    as={MdFavorite}
                                    w={10}
                                    h={10}
                                    color="red.200"
                                    onClick={() =>
                                      removeFavorite(favorite.objectid)
                                    }
                                  />
                                </Box>
                                <Box mt="2">
                                  <Checkbox
                                    colorScheme="blackAlpha"
                                    defaultunchecked="true"
                                    size="lg"
                                    onChange={() => updateVisit(favorite.id)}
                                  >
                                    To Visit
                                  </Checkbox>
                                </Box>
                              </Flex>
                            </Box>
                          </Box>
                        </Flex>
                      </div>
                    ))}
                </SimpleGrid>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Text>
          Your favorited objects to visit will appear here once you add them.
        </Text>
      )}
      <br></br>
      <Divider />
      <br></br>
      <Footer />
      <BackToTopButton />
    </>
  );
};

const mapDispatch = (dispatch) => {
  return {
    removeFavorite: (favoriteId) => {
      dispatch(deleteArtwork(favoriteId));
    },
    updateVisit: (artworkId) => {
      dispatch(updateVisit(artworkId));
    },
  };
};

export default connect((state) => state, mapDispatch)(Profile);
