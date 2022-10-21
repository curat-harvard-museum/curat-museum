import React from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { Badge, Box, Image, SimpleGrid, Center } from "@chakra-ui/react";

const validApiParams = ["6177", "6194", "5820", "6243", "5995"];

function SingleExhibition() {
  //   const [searchParams] = useSearchParams();

  //   const onlyValidParams = [...searchParams].filter(
  //     ([key, value]) => validApiParams.includes(key) && Boolean(value)
  //   );

  //   const formattedParamsString = new URLSearchParams(onlyValidParams).toString();

  const { id } = useParams();

  const { data, refetch: getExhibition } = useQuery(
    ["query-exhibitions"],
    async () => {
      return await apiClient.get(
        `/object?exhibition=${id}&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`
      );
    }
  );
  console.log("Single: ", data);
  function handleGetExhibition() {
    getAllExhibition();
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, md: 3 }} gap={5}>
        {data?.data.records
          .filter((record) => record.primaryimageurl)
          .map((record) => (
            <div key={record.id}>
              <>
                <Center>
                  <Box
                    maxW="sm"
                    overflow="hidden"
                    height="auto"
                    alignItems="center"
                    justifySelf="center"
                    as={Link}
                    to={`/object/${record.id}`}
                  >
                    {record.primaryimageurl ? (
                      <Image
                        margin-left="auto"
                        margin-right="auto"
                        width="100%"
                        className="exhibition-image"
                        key={record.id}
                        src={record.primaryimageurl}
                        alt="{record.title} by {record.people[0].name}"
                      ></Image>
                    ) : null}
                    {/* <Center>
                    <Badge borderRadius="full" colorScheme="gray">
                      Current Exhibition
                    </Badge>
                  </Center> */}
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {record.title}
                    </Box>
                    {/* <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    Floor: {record.venues[0].galleries[0].floor} &bull; Gallery
                    Location: {record.venues[0].galleries[0].name} (
                    {record.venues[0].galleries[0].gallerynumber})
                  </Box> */}
                    {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    End Date: {record.enddate}
                  </Box> */}
                  </Box>
                  <br></br>
                </Center>
              </>
            </div>
          ))}
      </SimpleGrid>
    </>
  );
}

export default SingleExhibition;
