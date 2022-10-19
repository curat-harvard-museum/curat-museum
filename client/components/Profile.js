import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Heading, Text, Divider, Image, Box, Badge, Button } from '@chakra-ui/react'

const Profile = (props) => {
  const username = useSelector((state) => state.auth.username);
  const favorites = useSelector((state) => state.auth.objects);
  // console.log('favorites', favorites)

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
  <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={favorite.primaryimageurl} alt={favorite.title} 
      borderRadius="md"
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
<Button>Unlike</Button>
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
    </>
  );
};

export default Profile;
