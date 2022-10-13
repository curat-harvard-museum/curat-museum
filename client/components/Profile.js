import React, {useState} from "react";
import { useSelector } from "react-redux";


/**
 * COMPONENT
 */
const Profile = (props) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);

  return (
    <>
      <h3>Welcome, {username}</h3>
      <div>
        {favorites?.map((favorite) => 
          ( <>
          <div>Title: {favorite.title}</div>
          <div>Artist: {favorite.artist}</div>
          <img src={favorite.primaryimageurl}></img>
          <div>Description: {favorite.description}</div>
          </>
          ))}
      </div>
    </>
  );
};

export default Profile;
