import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";

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
      <h2>Current Exhibitions</h2>
      <div className="grid-container">
        {data?.data.records.map((record) => (
          <div key={record.id}>
            <>
              <div>{record.title}</div>
              <br></br>
              End Date: {record.enddate}
              <br></br>
              Gallery Location:
              <li>Name: {record.venues[0].galleries[0].name}</li>
              <li>Floor: {record.venues[0].galleries[0].floor}</li>
              <li>
                Gallery Number: {record.venues[0].galleries[0].gallerynumber}
              </li>
              <br></br>
              {record.primaryimageurl ? (
                <img
                  className="exhibition-image"
                  key={record.id}
                  src={record.primaryimageurl}
                  alt="{record.title} by {record.people[0].name} "
                ></img>
              ) : null}
            </>
          </div>
        ))}
      </div>
    </>
  );
}

export default Exhibitions;
