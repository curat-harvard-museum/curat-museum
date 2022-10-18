import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

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
} from "@chakra-ui/react";

function SingleObjectView() {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  console.log(data?.data.images);

  return (
    <>
      <Grid
        h="100%"
        templateAreas={`
        "main main"
        "colors colors"
        "additional content"
        "additional content"`}
        justifyContent="center"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap="1"
      >
        <GridItem rowSpan={2} area={"main"}>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <Image
              className="single-image"
              src={`${data?.data.primaryimageurl}`}
              alt={`${data?.data.title}`}
            ></Image>
          </Box>
        </GridItem>

        <GridItem rowSpan={1} colSpan={2} area={"colors"}>
          <Flex
            justifyContent="space-between"
            flexWrap="wrap"
            py="5rem"
            gap="2rem"
          >
            {data?.data.colors.map((color) => (
              <Circle
                key={color.color}
                w="6rem"
                h="6rem"
                // w={`${color.percent * 800}px`}
                // h={`${color.percent * 800}px`}
                // size={`${color.percent * 100}px`}
                bg={`${color.color}`}
              ></Circle>
            ))}
          </Flex>
        </GridItem>

        {/* <GridItem rowSpan={2} area={"additional"}>
          {data?.data.images.map((image) => (
            <Image
              key={image.imageid}
              w="auto"
              h="30rem"
              src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
            ></Image>
          ))}
        </GridItem> */}

        <GridItem rowSpan={2} colSpan={1} area={"content"}>
          <VStack marginLeft="5rem" spacing={1} align="stretch">
            <Text as="b" color="gray.300" fontSize="1.25rem">
              Title
            </Text>
            <Divider />

            <Text>{data?.data.titles[0].title}</Text>

            <Box height="1rem" />

            {data?.data.people ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Artist
                </Text>
                <Divider />
                <Text>{data?.data.people[0].name}</Text>
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
              </>
            ) : null}

            <Box height="1rem" />

            {data?.data.gallery ? (
              <Text key={data?.data.gallery.id}>
                Level {data?.data.gallery.floor}, {data?.data.gallery.name}
                {data?.data.gallery.number}
              </Text>
            ) : null}

            <Box height="1rem" />

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Associated Exhibitions
            </Text>
            <Divider />
            {data?.data.exhibitions
              ? data?.data.exhibitions.map((exhibition) => (
                  <Text key={exhibition.exhibitionid}>{exhibition.title}</Text>
                ))
              : null}

            <Box height="1rem" />

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Related Artworks
            </Text>
            <Divider />
          </VStack>
        </GridItem>

        <FavoriteButton />
      </Grid>
    </>
  );
}

export default SingleObjectView;
