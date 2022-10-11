import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function ObjectSearch(query, pageNumber) {
  useEffect(() => {
    const { data, refetch: getAllObjects } = useQuery(
      ["query-objects"],
      async () => {
        return await apiClient.get(
          `/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${pageNumber}&size=100`
        );
      }
    );
  }, [query, pageNumber]);

  return null;
}

export default ObjectSearch;
