import { useSearchParams } from "react-router-dom";
import React from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (event) => {
    let search;
    if (event.target.value) {
      search = {
        keyword: event.target.value,
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
