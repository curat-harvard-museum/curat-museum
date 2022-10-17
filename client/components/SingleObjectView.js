import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";

import { Box, Text, Flex, Stack, Circle, Image } from "@chakra-ui/react";

function SingleObjectView() {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  console.log(data?.data.images.map((image) => image.idsid));

  return (
    <>
      <div>
        {
          <div>
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
            <Text>Title</Text>
            <Text>{data?.data.titles ? data?.data.titles[0].title : null}</Text>
            <Text>Artist</Text>
            <Text>{data?.data.people ? data?.data.people[0].name : null}</Text>

            {data?.data.images.map((image) => (
              <Image
                w="15rem"
                h="15rem"
                src={`https://ids.lib.harvard.edu/ids/iiif/${image.idsid}/full/full/0/default.jpg`}
              ></Image>
            ))}

            <Text>Century</Text>
            <Text>{data?.data.century ? data?.data.century : null}</Text>

            <Text>Date of Completion</Text>
            <Text>{data?.data.dated ? data?.data.dated : null}</Text>

            <Text>Culture</Text>
            <Text>{data?.data.culture ? data?.data.culture : null}</Text>

            <Text>Classification</Text>
            <Text>
              {data?.data.classification ? data?.data.classification : null}
            </Text>

            <Text>Medium/Technique</Text>
            <Text>{data?.data.medium ? data?.data.medium : null}</Text>
            <Text>{data?.data.technique ? data?.data.technique : null}</Text>

            {data?.data.gallery ? (
              <Text>
                Location Floor
                {data?.data.gallery.floor}
                {data?.data.gallery.name}
                {data?.data.gallery.number}
              </Text>
            ) : null}

            <Text>Associated Exhibitions</Text>
            <Text></Text>

            <Text>Related Artworks</Text>
            <Text></Text>

            <Text>{data?.data.title ? data?.data.title : null}</Text>
            <Text>{data?.data.people ? data?.data.people[0].name : null}</Text>
            <Text>{data?.data.classification}</Text>
          </div>
        }
      </div>
    </>
  );
}

export default SingleObjectView;
