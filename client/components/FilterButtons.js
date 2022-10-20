import React from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Button, Wrap, WrapItem } from "@chakra-ui/react";

const FilterButtons = ({ filterType }) => {
  const fetchObjects = async () => {
    const res = await fetch(
      `https://api.harvardartmuseums.org/${filterType}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`
    );
    return await res.json();
  };
  let [searchParams, setSearchParams] = useSearchParams();

  function handleClick(event) {
    event.preventDefault();
    setSearchParams({ [filterType]: event.target.value });
    window.location.reload(false);
  }
  let { data } = useQuery(["filterType", filterType], fetchObjects);

  return (
    <>
      <div>
        <Wrap spacing={4}>
          {data?.records.map((record) => (
            <WrapItem key={record.id}>
              <Button
                colorScheme="gray"
                size="sm"
                variant="ghost"
                onClick={handleClick}
                value={record.name}
              >
                {record.name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </div>
    </>
  );
};

export default FilterButtons;
