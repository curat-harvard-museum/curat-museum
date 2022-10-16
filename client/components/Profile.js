import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Heading, Text, Divider, Image, Box, AspectRatio } from '@chakra-ui/react'

const Profile = (props) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);
  // console.log('favorites', favorites)

  return (
    <>
      <Heading as='h4' size='md'>Welcome, {username}</Heading>
      <div>
        {favorites?.map((favorite) => (
          <div key={favorite.objectid}>
            <div><Heading as='h5' size='sm'>Title: {favorite.title}</Heading></div>
            <div><Heading as='h5' size='sm'>Artist: {favorite.artist}</Heading></div>
            <AspectRatio maxW='400px' ratio={4 / 3}>
  <Image boxSize='400px' src={favorite.primaryimageurl} alt='Favorite Primary Image URL' />
            </AspectRatio>
            <div><Text fontSize='sm'>Description: {favorite.description}</Text></div>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
