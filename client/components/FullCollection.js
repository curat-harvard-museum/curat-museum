import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "react-query";

import { Link, useSearchParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { updateUser, deleteArtwork } from "../store/auth";

import BackToTopButton from "./BackToTopButton";
import {
  Accordion,
  Input,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  SimpleGrid,
  Box,
  Image,
  Icon,
  CloseButton,
  Show,
  Drawer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useDisclosure,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { connect } from "react-redux";

const collectionFilters = [
  "century",
  "culture",
  "classification",
  "medium",
  "period",
  "place",
  "technique",
];

const validApiParams = [
  ...collectionFilters,
  "person",
  // "title",
];

function AllObjects({ makeFavorite, auth, removeFavorite }) {
  const observerElem = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  let [searchParams, setSearchParams] = useSearchParams();

  function isFavorite(id) {
    return !!(auth.objects || []).find((o) => o.objectid === id * 1);
  }

  const onlyValidParams = [...searchParams]
    .filter(([key, value]) => validApiParams.includes(key) && Boolean(value))
    .sort(
      (a, b) => validApiParams.indexOf(a[0]) - validApiParams.indexOf(b[0])
    );

  const formattedParamsString = new URLSearchParams(onlyValidParams).toString();

  const fetchObjects = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://api.harvardartmuseums.org/object?${formattedParamsString}&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${pageParam}`
    );
    return await res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["objects", formattedParamsString], fetchObjects, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleObserver = useCallback(
    (records) => {
      const [target] = records;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  const menuItems = [
    ...new Set(
      data?.pages.map((collection) =>
        collection.records
          .filter((record) => record.primaryimageurl)
          .map((record) => record.classification)
      )
    ),
  ];

  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
  }, [searchParams]);

  const searchHandler = (event) => {
    // const title = searchParams.get("title");
    const person = searchParams.get("person");

    let search;
    if (event.target.value) {
      search = {
        // title: event.target.value,
        person: event.target.value,
      };
    } else {
      search = undefined;
    }

    setSearchParams(search, { replace: true });
  };

  function handleSubmit(event) {
    event.preventDefault();
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <>
      {/* <Search /> */}

      <Flex flexDirection="column">
        <Input
          margin="auto"
          width="80%"
          variant="filled"
          value={searchParams.keyword}
          onChange={searchHandler}
          placeholder="Search by Artist"
        />

        <Box
          sx={{
            position: "-webkit-sticky",
            /* Safari */ position: "sticky",
            top: "0",
          }}
          backgroundColor="rgba(255, 
 255, 255, 0.8)"
          backdropFilter="saturate(180%) blur(5px)"
          w="100%"
          justify="center"
        >
          <Button
            margin="auto"
            onClick={onOpen}
            borderBottomWidth="1px"
            marginTop="2 rem"
            marginBottom="30px"
            display="flex"
            paddingBottom="2px"
            variant="unstyled"
          >
            Collection Filters
          </Button>
        </Box>
      </Flex>

      <Show breakpoint="(min-width: 770px)">
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent overflowY="auto">
            <Flex alignContent="flex-end" justifyContent="space-between">
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <CloseButton onClick={onClose} size="lg" />
            </Flex>

            <Accordion allowToggle>
              {collectionFilters.map((param) => (
                <DrawerBody key={param}>
                  <AccordionItem>
                    <AccordionButton>
                      {capitalizeFirstLetter(param)}
                    </AccordionButton>
                    <AccordionPanel>
                      <FilterButtons filterType={param} />
                    </AccordionPanel>
                  </AccordionItem>
                </DrawerBody>
              ))}
            </Accordion>
          </DrawerContent>
        </Drawer>
      </Show>

      <Show breakpoint="(max-width: 770px)">
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent overflowY="auto">
            <Flex justifyContent="space-between">
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <CloseButton onClick={onClose} size="md" />
            </Flex>
            <Accordion allowToggle>
              {collectionFilters.map((param) => (
                <DrawerBody key={param}>
                  <AccordionItem>
                    <AccordionButton>
                      {capitalizeFirstLetter(param)}
                    </AccordionButton>
                    <AccordionPanel>
                      <FilterButtons filterType={param} />
                    </AccordionPanel>
                  </AccordionItem>
                </DrawerBody>
              ))}
            </Accordion>
          </DrawerContent>
        </Drawer>
      </Show>

      <SimpleGrid
        columns={[1, null, 2, null, 3, null, 4]}
        spacingX="5rem"
        spacingY="5rem"
      >
        {data?.pages.map((collection) =>
          collection.records
            .filter((record) => record.primaryimageurl)
            .map((record) => (
              <Box key={record.id} w="100%">
                <Box
                  as={Link}
                  to={`/object/${record.id}`}
                  mb={10}
                  d="inline-block"
                  sx={{ breakInside: "avoid" }}
                >
                  <Image
                    w="100%"
                    src={record.primaryimageurl}
                    alt="{record.title} by {record.people[0].name} "
                  />
                </Box>
                <Flex marginTop="1rem" justifyContent="space-between">
                  <div>
                    <Text w="80%" color="black" fontSize="1rem">
                      {record.people ? record.people[0].name : null}
                    </Text>
                    <Text
                      w="80%"
                      color="gray.600"
                      noOfLines={2}
                      fontSize="1rem"
                    >
                      {record.title}
                    </Text>
                    <Text w="80%" as="b" color="gray.600" fontSize="1rem">
                      {record.classification}
                    </Text>
                  </div>
                  <div>
                    {auth.username ? (
                      isFavorite(record.objectid) ? (
                        <Icon
                          as={MdFavorite}
                          w={8}
                          h={8}
                          color="red.200"
                          onClick={() => removeFavorite(record.objectid)}
                        />
                      ) : (
                        <Icon
                          as={MdFavoriteBorder}
                          w={8}
                          h={8}
                          color="red.200"
                          onClick={() => makeFavorite(record)}
                        />
                      )
                    ) : (
                      <>
                        <Icon
                          as={MdFavoriteBorder}
                          w={8}
                          h={8}
                          color="red.200"
                          onClick={onOpen}
                        />

                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay
                            bg="blackAlpha.300"
                            backdropFilter="blur(10px)"
                          />
                          <ModalContent>
                            <ModalHeader>Log in</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              Please log in to add artwork to your profile.
                            </ModalBody>
                            <ModalFooter>
                              <Stack
                                spacing={20}
                                direction="row"
                                align="center"
                              >
                                <Button variant="ghost" onClick={onClose}>
                                  Close
                                </Button>
                                <Link to="/login">
                                  <Button colorScheme="gray" mr={3}>
                                    Log in to Like
                                  </Button>
                                </Link>
                              </Stack>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                    )}
                  </div>
                </Flex>
              </Box>
            ))
        )}
        <div ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "loading..." : "fin."}
        </div>
        <BackToTopButton />
      </SimpleGrid>
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

export default connect((state) => state, mapDispatch)(AllObjects);
