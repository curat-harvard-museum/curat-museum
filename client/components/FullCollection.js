import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import Search from "./Search";
import BackToTopButton from "./BackToTopButton";
import {
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
  SimpleGrid,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const validApiParams = [
  "century",
  "color",
  "culture",
  "gallery",
  "classification",
  "medium",
  "period",
  "place",
  "technique",
];

function AllObjects() {
  const observerElem = useRef(null);
  const [searchParams] = useSearchParams();

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
        <Accordion allowToggle>
          <AccordionItem>
            <Tabs variant="line" colorScheme="gray">
              <TabList>
                <Wrap>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Century</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Color</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Culture</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Gallery</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Type</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Medium</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Period</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Place</Tab>
                    </AccordionButton>
                  </WrapItem>
                  <WrapItem>
                    <AccordionButton>
                      <Tab>Technique</Tab>
                    </AccordionButton>
                  </WrapItem>
                  {/* <Tab>Remove Filters</Tab> */}
                </Wrap>
              </TabList>
              <TabPanels>
                {validApiParams.map((param) => (
                  <AccordionPanel key={param}>
                    <TabPanel>
                      <FilterButtons filterType={param} />
                    </TabPanel>
                  </AccordionPanel>
                ))}
              </TabPanels>
            </Tabs>
          </AccordionItem>
        </Accordion>
      </Flex>
      //comment
      <SimpleGrid columns={[1, null, 2, null, 4]} spacing="5rem">
        {data?.pages.map((collection) =>
          collection.records
            .filter((record) => record.primaryimageurl)
            .map((record) => (
              <Box key={record.id}>
                <Link to={`/object/${record.id}`}>
                  <>
                    <img
                      className="single-grid-image"
                      src={record.primaryimageurl}
                      alt="{record.title} by {record.people[0].name} "
                    ></img>
                    <Text color="black" fontSize=".875rem">
                      {record.people ? record.people[0].name : null}
                    </Text>
                    <Text color="gray.500" noOfLines={2} fontSize=".875rem">
                      {record.title}
                    </Text>
                    <Text as="b" color="gray.400" fontSize=".875rem">
                      {record.classification}
                    </Text>
                  </>
                </Link>
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
