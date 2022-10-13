import React from "react";
import { useSelector } from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";

/**
 * COMPONENT
 */
const Profile = (props) => {
  const username = useSelector((state) => state.auth.username);
  // console.log("state.auth.objects", state.auth.objects)
  // const [favorites, setFavorites] = useState(state.auth.objects)
  const favorites = useSelector((state) => state.auth.objects);
  console.log("favorites", favorites)

  return (
    <>
      <h3>Welcome, {username}</h3>
      {/* <h3>{favorite.title}</h3> */}
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
      {/* <h3>{favorites}</h3> */}
    {/* <div className="profile-container">
      <div>{favorites.map((favorite) => (
        <div key={favorite.id}>
          <Link to={`/object/${favorite.id}`} >{favorite.title}
          </Link>
          {favorite.primaryimageurl ? (<img src={favorite.primaryimageurl}
          alt="{favorite.title} by {favorite.people[0].name}"/>) : null}
          <p>Artist: {favorite.people[0].name}</p>
          <p>Description: {favorite.description}</p>
          </div>
      ))}</div>
    </div> */}
    </>
  );
};

export default Profile;
