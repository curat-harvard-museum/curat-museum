import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateUser } from "../store/auth";
import { Button } from "@chakra-ui/react";
import { Link, Redirect } from "react-router-dom";

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

function SingleObjectView({ makeFavorite, auth, isLoggedIn, handleClick }) {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });
  // const { auth } = useSelector(state => state);

  const isFavorite = !!(auth.objects || []).find((o) => o.objectid === id * 1);
  // console.log(isFavorite);

  // const user = useSelector((state) => state.auth);
  // const [username] = user

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
            {auth.username ? 
            (
            <Button
              alignSelf="flex-end"
              marginBottom="8rem"
              onClick={() => makeFavorite(data.data)}
            >
              {isFavorite ? "Unlike" : "Like"}
            </Button>
             ) : (
            <a href="/register"><Button>Like</Button></a> 
            )}
          </Box>
        </GridItem>

        <GridItem rowSpan={1} colSpan={2} area={"colors"}>
          <Flex
            justifyContent="space-between"
            flexWrap="wrap"
            py="5rem"
            gap="2rem"
          >
            {data?.data?.colors?.map((color) => (
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

        <GridItem rowSpan={2} columnSpan={2} area={"additional"}>
          {data?.data?.images?.map((image) => (
            <Image
              key={image.imageid}
              w="auto"
              h="30rem"
              src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
            ></Image>
          ))}
        </GridItem>

        <GridItem rowSpan={2} colSpan={1} area={"content"}>
          <VStack marginLeft="5rem" spacing={1} align="stretch">
            <Text as="b" color="gray.300" fontSize="1.25rem">
              Title
            </Text>
            <Divider />

            <Text>{data?.data?.titles[0]?.title}</Text>

            <Box height="1rem" />

            {data?.data?.people ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Artist
                </Text>
                <Divider />
                <Text>{data?.data?.people[0].name}</Text>
              </>
            ) : null}

            <Box height="1rem" />

            {data?.data?.century ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Century
                </Text>
                <Divider />
                <Text>{data?.data.century}</Text>
              </>
            ) : null}
            <Box height="1rem" />

            {data?.data?.dated ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Date of Completion
                </Text>
                <Divider />
                <Text>{data?.data.dated}</Text>
              </>
            ) : null}

            <Box height="1rem" />

            {data?.data?.culture ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Culture
                </Text>
                <Divider />
                <Text>{data?.data.culture ? data?.data.culture : null}</Text>
              </>
            ) : null}

            <Box height="1rem" />

            {data?.data?.classification ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Classification
                </Text>
                <Divider />
                <Text>{data?.data.classification}</Text>
              </>
            ) : null}

            <Box height="1rem" />

            {data?.data?.medium ? (
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

            {data?.data?.gallery ? (
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

            {data?.data?.exhibitions ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Associated Exhibitions
                </Text>
                <Divider />
                {data?.data.exhibitions.map((exhibition) => (
                  <Text key={exhibition.exhibitionid}>{exhibition.title}</Text>
                ))}
              </>
            ) : null}

            <Box height="1rem" />

            {/* {data?.data.related ? (
              <>
                <Text as="b" color="gray.300" fontSize="1.25rem">
                  Related Works
                </Text>
                <Divider />
                {data?.data.related.map((work) => (
                  <Link to={`/object/${work.objectid}`}>
                    <Box>{`${work.relationship} to this work`}</Box>
                  </Link>
                ))}
              </>
            ) : null} */}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}

const mapDispatch = (dispatch) => {
  return {
    makeFavorite: (artwork) => {
      dispatch(updateUser(artwork));
    },
  };
};

export default connect((state) => state, mapDispatch)(SingleObjectView);
