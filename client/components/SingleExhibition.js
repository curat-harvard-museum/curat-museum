import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { Box, Image, SimpleGrid, Heading, Text } from "@chakra-ui/react";

function SingleExhibition() {
  const { id } = useParams();

  const { data, refetch: getExhibition } = useQuery(
    ["query-exhibitions"],
    async () => {
      return await apiClient.get(
        `/object?exhibition=${id}&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`
      );
    }
  );

  function handleGetExhibition() {
    getAllExhibition();
  }

  return (
    <>
      <Heading textAlign={"center"}>Exhibition On View</Heading>
      <br></br>
      <SimpleGrid
        columns={[1, null, 2, null, 3, null, 4]}
        spacingX="5rem"
        spacingY="5rem"
      >
        {data?.data.records
          .filter((record) => record.primaryimageurl)
          .map((record) => (
            <div key={record.id}>
              <Box as={Link} to={`/object/${record.id}`} w="100%">
                {record.primaryimageurl ? (
                  <Image
                    w="100%"
                    src={record.primaryimageurl}
                    alt="{record.title} by {record.people[0].name}"
                  ></Image>
                ) : null}
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
            </div>
          ))}
      </SimpleGrid>
    </>
  );
}

export default SingleExhibition;
