import React from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

const fetchObjects = async () => {
  const res = await fetch(
    `https://api.harvardartmuseums.org/classification?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
  );
  return await res.json();
};

const FilterButtons = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleClick(event) {
    event.preventDefault();
    setSearchParams({ classification: event.target.value });
    window.location.reload(false);
  }
  const { data } = useQuery(["classifications"], fetchObjects);

  return (
    <>
      <div>
        {data?.records.map((record) => (
          <button key={record.id} onClick={handleClick} value={record.name}>
            {record.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterButtons;
