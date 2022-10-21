import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../http-common";
import {
  Heading,
  Image,
  Box,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  useCheckboxGroup,
  useCheckbox,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
  Divider,
  SimpleGrid,
  Center
} from "@chakra-ui/react";
import { deleteArtwork, updateVisit } from "../store/auth";
import BackToTopButton from "./BackToTopButton";
import Footer from "./Footer";

const Profile = ({ removeFavorite, isVisited, updateVisit }) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  // const [checkedItem, setCheckedItem] = useState(false)
  const [filter, setFilter] = useState("all")
  const handleSelectChange = evt => {
    setFilter(evt.target.value)
  }

// const artworks = favorites.filter(favorite => {
//   if(filter === "all") return favorite
//   if(filter === isVisited) return favorite.isVisited
//   if(filter === !isVisited) return !favorite.isVisited
// })

  const { value, onChange, setValue, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [false],
  })

  useEffect(() => {
    // storing input value
    localStorage.setItem(value, JSON.stringify(value));
  }, [value]);

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
              {/* <div>
                <label htmlFor="vistedFilter">Filter by status:</label>
                <select onChange={handleSelectChange} name="visitedFilter">
                  <option>all</option>
                  <option>isVisited</option>
                  <option>!isVisited</option>
                </select>
              </div> */}
              <div>
          <SimpleGrid columns={{ base: 1, md: 2, md: 3 }} gap={5}>
                {favorites?.filter(favorite => favorite["user-object"].isVisited === false).map((favorite) => (
                  <div key={favorite.objectid}>
                    <Flex flexWrap="wrap">
                      <Box
                        boxSize="auto"
                        minW="auto"
                        maxW="auto"
                        mx="auto"
                        borderWidth="1px"
                        overflow="hidden"
                        // alignItems="center"
                        // justifySelf="center"
                        // flexDirection="row"
                      >
                        <Image
                          src={favorite.primaryimageurl}
                          alt={favorite.title}
                          margin-left="auto"
                          margin-right="auto"
                          width="100%"
                        />
                        <Box p="6">
                          <Box alignItems="baseline">
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="gray"
                            >
                              Favorite
                            </Badge>
                            <Box
                              maxW="sm"
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              Artist: {favorite.artist}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}
                          >
                            Title: {favorite.title}
                          </Box>

                          <Box>
                            {favorite.description}
                            <Box as="span" color="gray.600" fontSize="sm"></Box>
                          </Box>
                          <br />
          
                          <Flex flexWrap="nowrap" justifyContent="space-between" alignItems="center">
                          <Box mt="2">
                            <Button
                              onClick={() => removeFavorite(favorite.objectid)}
                            >
                              Unlike
                            </Button>
                          </Box>
                          <Box mt="2" >
                            <Checkbox colorScheme="blackAlpha" defaultunchecked="true" size="lg" onChange={() => updateVisit(favorite.id)}>
                              Visited
                            </Checkbox>
                            <Button onClick={() => console.log("favorite", favorite)}>
                              Console
                            </Button>
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
              <p>
                The objects you visited will appear here after you check them
                off.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <p>
          Your favorited objects to visit will appear here once you add them.
        </p>
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
    }
  };
};

export default connect((state) => state, mapDispatch)(Profile);
