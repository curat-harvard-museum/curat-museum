import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../store/auth";
import { Button } from "@chakra-ui/react";

const SingleObjectView = ({ makeFavorite, auth }) => {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });

  const isFavorite = !!(auth.objects || []).find((o) => o.objectid === id * 1);
  // console.log(isFavorite);

  return (
    <>
      <div>
        {data?.data.colors.map((color) => (
          <div key={color.color}>
            <div
              className="single-color-circle"
              style={{ backgroundColor: `${color.color}` }}
            ></div>
          </div>
        ))}
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
              {data?.data.people ? data?.data.people[0].name : null}
            </div>
            <div className="caption-text classification-caption-text">
              {data?.data.classification}
            </div>
          </div>
        }
        <Button onClick={() => makeFavorite(data.data)}>{isFavorite ? "Unlike" : "Like"}</Button>
      </div>
    </>
  );
};

const mapDispatch = (dispatch) => {
  return {
    makeFavorite: (artwork) => {
      dispatch(updateUser(artwork));
    },
  };
};

export default connect((state) => state, mapDispatch)(SingleObjectView);
