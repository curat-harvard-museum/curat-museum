import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";
import { Badge, Box } from "@chakra-ui/react";

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

  return (
    <>
      <div className="exhibition-container">
        {data?.data.records.map((record) => (
          <div key={record.id}>
            <>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                {record.primaryimageurl ? (
                  <img
                    className="exhibition-image"
                    key={record.id}
                    src={record.primaryimageurl}
                    alt="{record.title} by {record.people[0].name}"
                  ></img>
                ) : null}
                <Badge borderRadius="full" px="2" colorScheme="gray">
                  Current Exhibition
                </Badge>
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
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
                  Floor: {record.venues[0].galleries[0].floor} &bull; Gallery
                  Location: {record.venues[0].galleries[0].name} (
                  {record.venues[0].galleries[0].gallerynumber})
                </Box>
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  End Date: {record.enddate}
                </Box>
              </Box>
            </>
          </div>
        ))}
      </div>
    </>
  );
}

export default Exhibitions;
