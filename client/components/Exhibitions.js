import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { Badge, Box, Image, SimpleGrid, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Exhibitions() {
  const { data, refetch: getExhibitions } = useQuery(
    ["query-exhibitions"],
    async () => {
      return await apiClient.get(
        `/exhibition?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&status=current&venue=HAM`
      );
    }
  );

  function handleGetExhibitions() {
    getAllExhibitions();
  }
  // console.log(
  //   "exhibitions: ",
  //   data?.data.records.map((record) =>
  //     record.venues.map((venue) =>
  //       venue.galleries.map((gallery) => gallery.name)
  //     )
  //   )
  // );
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, md: 3 }} gap={5}>
        {data?.data.records.map((record) =>
          record.venues?.map((venue) =>
            venue.galleries.map((gallery) => (
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
                      to={`/exhibitions/${record.id}`}
                    >
                      {record.primaryimageurl ? (
                        <Image
                          margin-left="auto"
                          margin-right="auto"
                          width="100%"
                          className="exhibition-image"
                          key={record.id}
                          src={record.primaryimageurl}
                          alt="{record.title} by {record?.people[0]?.name}"
                        ></Image>
                      ) : null}
                      <Center>
                        <Badge borderRadius="full" colorScheme="gray">
                          Current Exhibition
                        </Badge>
                      </Center>
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                      >
                        {record.title}
                      </Box>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        Floor: {gallery.floor} &bull; {gallery.name} (
                        {gallery.gallerynumber})
                      </Box>
                      <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        End Date: {record.enddate}
                      </Box>
                    </Box>
                    <br></br>
                  </Center>
                </>
              </div>
            ))
          )
        )}
      </SimpleGrid>
    </>
  );
}

export default Exhibitions;
