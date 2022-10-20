import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { connect } from "react-redux";
import { updateUser, deleteArtwork } from "../store/auth";
import { Button } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
// import Slider from "react-slick";

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

function SingleObjectView({ makeFavorite, auth, removeFavorite }) {
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

  // const settings = {
  //   dots: true,
  //   fade: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <>
      <Grid
        h="100%"
        // templateAreas={`
        // "main main"
        // "colors colors"
        // "content content"
        // `}
        justifyContent="center"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(1, 1fr)"
        gap="1"
      >
        <GridItem marginTop="2rem" rowSpan={1}>
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
                <Button
                  marginBottom="1rem"
                  onClick={() => removeFavorite(data.data.objectid)}
                >
                  Unlike
                </Button>
              ) : (
                <Button
                  marginBottom="1rem"
                  onClick={() => makeFavorite(data.data)}
                >
                  Like
                </Button>
              )
            ) : (
              <Link to="/register">
                <Button>Register to Like</Button>
              </Link>
            )}
          </Box>
        </GridItem>

        <GridItem colSpan={2}>
          <Flex
            justifyContent="space-between"
            flexWrap="wrap"
            // py="2rem"
            gap="0.5rem"
          >
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

        {/* <GridItem rowSpan={2} columnspan={2} area={"additional"}>
          <Box>
            {data?.data.images ? (
              <Slider {...settings}>
                {data?.data.images.map((image) => (
                  <Image
                    key={image.imageid}
                    // w="auto"
                    // h="30rem"
                    src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
                  />
                ))}
              </Slider>
            ) : null}
          </Box>
        </GridItem> */}

        <GridItem rowSpan={1} colSpan={2}>
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
                  <Text key={exhibition.exhibitionid}>{exhibition.title}</Text>
                ))}
              </>
            ) : null}

            <Box height="1rem" />
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
    removeFavorite: (favoriteId) => {
      dispatch(deleteArtwork(favoriteId));
    },
  };
};

export default connect((state) => state, mapDispatch)(SingleObjectView);
