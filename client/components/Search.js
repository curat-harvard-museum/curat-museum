import { useSearchParams } from "react-router-dom";
import React from "react";
import FilterButtons from "./FilterButtons";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (event) => {
    const classification = searchParams.get("classification");
    let search;
    if (event.target.value) {
      search = {
        classification: event.target.value,
      };
    } else {
      search = undefined;
    }

    setSearchParams(search, { replace: true });
  };

  return (
    <div>
      <input
        value={searchParams.keyword}
        onChange={searchHandler}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
