import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";

function AllObjects() {
  const { data, refetch: getAllObjects } = useQuery(
    ["query-objects"],
    async () => {
      return await apiClient.get(
        `/object?apikey=${process.env.REACT_APP_HARVARD_TOKEN}&page=27&size=100`
      );
    }
  );

  function handleGetObjects() {
    getAllObjects();
  }

  return (
    <>
      <div className="container">
        {data?.data.records.map((record) => (
          <div key={record.id}>
            {record.primaryimageurl ? (
              <img
                className="imageTile"
                key={record.id}
                src={record.primaryimageurl}
                alt="{record.title} by {record.people[0].name} "
              ></img>
            ) : (
              <div className="no-image"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllObjects;
