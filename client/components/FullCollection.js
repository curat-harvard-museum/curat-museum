import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import BackToTopButton from "./BackToTopButton";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  SimpleGrid,
  Box,
  Image,
  Show,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useDisclosure,
  Flex,
  Button,
} from "@chakra-ui/react";

const validApiParams = [
  "century",
  "culture",
  "classification",
  "medium",
  "period",
  "place",
  "technique",
];

function AllObjects() {
  const observerElem = useRef(null);
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

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

  return (
    <>
      {/* <Search /> */}
      <Flex
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

        <Show>
          <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent overflowY="auto">
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <Accordion allowToggle>
                {validApiParams.map((param) => (
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

        <Show>
          <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent overflowY="auto">
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <Accordion allowToggle>
                {validApiParams.map((param) => (
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
      </Flex>

      <SimpleGrid
        columns={[1, null, 2, null, 3, null, 4]}
        spacingX="5rem"
        spacingY="5rem"
      >
        {data?.pages.map((collection) =>
          collection.records
            .filter((record) => record.primaryimageurl)
            .map((record) => (
              <Box
                as={Link}
                key={record.id}
                to={`/object/${record.id}`}
                w="100%"
              >
                <Box mb={10} d="inline-block" sx={{ breakInside: "avoid" }}>
                  <Image
                    w="100%"
                    src={record.primaryimageurl}
                    alt="{record.title} by {record.people[0].name} "
                  />
                  <Text color="black" fontSize="1rem">
                    {record.people ? record.people[0].name : null}
                  </Text>
                  <Text color="gray.600" noOfLines={2} fontSize="1rem">
                    {record.title}
                  </Text>
                  <Text as="b" color="gray.600" fontSize="1rem">
                    {record.classification}
                  </Text>
                </Box>
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

export default AllObjects;
