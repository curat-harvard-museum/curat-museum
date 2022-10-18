import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

import { Box, Text, Flex, Stack, Circle, Image } from "@chakra-ui/react";

function SingleObjectView() {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  return (
    <>
      <div>
        {
          <Box display="flex" flexWrap="wrap">
            <Image
              className="single-image"
              src={`${data?.data.primaryimageurl}`}
              alt={`${data?.data.title}`}
            ></Image>
            {data?.data.colors.map((color) => (
              <Circle
                key={color.color}
                position="relative"
                w="80px"
                h="80px"
                bg={`${color.color}`}
              ></Circle>
            ))}
            <Text as="b" color="gray.300" fontSize="1.25rem">
              Title
            </Text>
            <Text>{data?.data.titles ? data?.data.titles[0].title : null}</Text>
            <Text>Artist</Text>
            <Text>{data?.data.people ? data?.data.people[0].name : null}</Text>

            {data?.data.images.map((image) => (
              <Image
                key={image.displayorder}
                w="15rem"
                h="15rem"
                src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
              ></Image>
            ))}

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Century
            </Text>
            <Text>{data?.data.century ? data?.data.century : null}</Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Date of Completion
            </Text>
            <Text>{data?.data.dated ? data?.data.dated : null}</Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Culture
            </Text>
            <Text>{data?.data.culture ? data?.data.culture : null}</Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Classification
            </Text>
            <Text>
              {data?.data.classification ? data?.data.classification : null}
            </Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Medium/Technique
            </Text>
            <Text>{data?.data.medium ? data?.data.medium : null}</Text>
            <Text>{data?.data.technique ? data?.data.technique : null}</Text>

            {data?.data.gallery ? (
              <Text as="b" color="gray.300" fontSize="1.25rem">
                Location Floor
              </Text>
            ) : null}

            {data?.data.gallery ? (
              <Text key={data?.data.gallery.id}>
                {data?.data.gallery.floor},{data?.data.gallery.name},
                {data?.data.gallery.number}
              </Text>
            ) : null}

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Associated Exhibitions
            </Text>
            {data?.data.exhibitions
              ? data?.data.exhibitions.map((exhibition) => (
                  <Text>{exhibition.title}</Text>
                ))
              : null}

            <Text></Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Related Artworks
            </Text>
            <Text></Text>

            <Text as="b" color="gray.300" fontSize="1.25rem">
              Classification
            </Text>
            <Text>{data?.data.classification}</Text>
            <Text as="b" color="gray.300" fontSize="1.25rem">
              Related Artworks
            </Text>
          </Box>
        }
        <FavoriteButton />
      </div>
    </>
  );
}

export default SingleObjectView;
