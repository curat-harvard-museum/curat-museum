import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";

function SingleObjectView() {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=83&size=100`
    );
  });

  console.log(data?.data);

  return (
    <>
      <div>
        {/* {data?.data.colors
          .filter((color) => color)
          .map((color) => (
            <div
              key={color.color}
              className="single-color-circle"
              style="color:`${color.color}`"
            ></div>
          ))} */}
        {
          <div>
            <img
              className="single-image"
              src={data?.data.primaryimageurl}
              alt="{data?.data.title} by {data?.data.people[0].name} "
            ></img>
            <div className="caption-text title-caption-text">
              {data?.data.title}
            </div>
            <div className="caption-text person-caption-text">
              {data?.data.people[0].name ? data?.data.people[0].name : null}
            </div>
            <div className="caption-text classification-caption-text">
              {data?.data.classification}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default SingleObjectView;
