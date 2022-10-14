import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authenticate } from "../store";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";

const FavoriteButton = (props) => {
    const username = useSelector((state) => state.auth.username);
    // console.log('props', props)
    console.log('username', username)
    const { id } = useParams();
    const { data } = useQuery(["query-single-object"], async () => {
      return await apiClient.get(
        `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
      );
    });
    console.log('id', id)
    console.log('data', data)
    if (username === undefined) {
        return (
            <p><span>
                <a href="/login">Log in to favorite this recipe!</a>
            </span></p>);
    }
    return(

        <button type="submit">Like</button>
    )
    
}

export default FavoriteButton