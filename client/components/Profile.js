import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../http-common";
import { Heading, Image, Box, Badge, Button } from '@chakra-ui/react'
import { deleteArtwork } from "../store/auth";
import BackToTopButton from "./BackToTopButton";


const Profile = ({removeFavorite, isVisited }) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);
const dispatch = useDispatch()
  const { id } = useParams();
  // const isFavorite = !!(auth.objects || []).find((o) => o.objectid === id * 1);
  // console.log(isFavorite);
  // console.log('auth.objects[0].objectid', auth.objects[0].objectid)
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
    );
  });
  
  return (
    <>
      <Heading as='h4' size='md'>Welcome, {username}</Heading>
      <div>
        {favorites?.map((favorite) => (
  //         <div key={favorite.objectid}>
  //           <div><Heading as='h5' size='sm'>Title: {favorite.title}</Heading></div>
  //           <div><Heading as='h5' size='sm'>Artist: {favorite.artist}</Heading></div>
  //           <AspectRatio maxW='400px' ratio={4 / 3}>
  // <Image boxSize='400px' src={favorite.primaryimageurl} alt='Favorite Primary Image URL' />
  //           </AspectRatio>
  //           <div><Text fontSize='sm'>Description: {favorite.description}</Text></div>
  //           <Divider />
  //         </div>
  <div key={favorite.objectid}>
  <Box maxW='sm' borderWidth='1px' overflow='hidden'>
      <Image src={favorite.primaryimageurl} alt={favorite.title} 
      margin-left="auto"
      margin-right="auto"
      width="100%"/>

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='gray'>
            Favorite
          </Badge>
          <Box
            maxW="sm"
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            Artist: {favorite.artist}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          Title: {favorite.title}
        </Box>

        <Box>
          {favorite.description}
          <Box as='span' color='gray.600' fontSize='sm'>
          </Box>
        </Box>
<Box display='flex' mt='2' alignItems='center'>
<Button onClick={() => removeFavorite(favorite.objectid)}>Unlike</Button>
</Box>
        {/* <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
    </div>
        ))}
      </div>
        <BackToTopButton />
    </>
  );
};

// export default Profile;
const mapDispatch = (dispatch) => {
  return {
    removeFavorite: (favoriteId) => {
      dispatch(deleteArtwork(favoriteId));
    },
  };
};

export default connect((state) => state, mapDispatch)(Profile);

