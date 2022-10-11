import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";
import { Link } from "react-router-dom";

function AllObjects() {
  const { data, refetch: getAllObjects } = useQuery(
    ["query-objects"],
    async () => {
      return await apiClient.get(
        `/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=83&size=100`
      );
    }
  );

  function handleGetObjects() {
    getAllObjects();
  }

  return (
    <>
      <div className="grid-container">
        {data?.data.records
          .filter((record) => record.primaryimageurl)
          .map((record) => (
            <Link key={record.id} to={`/object/${record.id}`}>
              <>
                <img
                  className="single-grid-image"
                  src={record.primaryimageurl}
                  alt="{record.title} by {record.people[0].name} "
                ></img>
                <div className="caption-text title-caption-text">
                  {record.title}
                </div>
                <div className="caption-text person-caption-text">
                  {/* {record.people[0].name ? record.people[0].name : null} */}
                </div>
                <div className="caption-text classification-caption-text">
                  {record.classification}
                </div>
              </>
            </Link>
          ))}
      </div>
    </>
  );
}

export default AllObjects;
