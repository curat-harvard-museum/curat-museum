import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../http-common";
import { Heading, Image, Box, Badge, Button, Checkbox, CheckboxGroup, useCheckboxGroup, useCheckbox, Tab, Tabs, TabList, TabPanels, TabPanel, Flex} from '@chakra-ui/react'
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

  // const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
  //     useCheckbox(props)
  // console.log("checkbox state", useCheckbox(props.state))
  console.log("remove Favorite", removeFavorite)
  
  return (
    <>
      <Heading as='h4' size='md'>Welcome, {username}</Heading>
        {favorites?.length > 0 ? 
      (<Tabs variant='soft-rounded' colorScheme='gray'>
  <TabList>
    <Tab>To Visit</Tab>
    <Tab>Visited</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
        <div>
        {favorites?.map((favorite) => (
  <div key={favorite.objectid}>
  <Flex flexWrap="wrap">

  <Box boxSize="auto" minW="auto" maxW='auto' mx="auto" borderWidth='1px' overflow='hidden' alignItems="center" justifySelf="center">
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
<Box display='flex' mt='2' alignItems='right'>
<Checkbox colorScheme='facebook' defaultunchecked>Visited</Checkbox>
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
            </Flex>
    </div>
        ))} 
      </div>
    </TabPanel>
    <TabPanel>
      <p>The objects you visited will appear here after you check them off.</p>
    </TabPanel>
  </TabPanels>
</Tabs>)
        :
          (
            <p>Your favorited objects to visit will appear here once you add them.</p>
    )
      }
        <BackToTopButton />
    </>
  );
};

const mapDispatch = (dispatch) => {
  return {
    removeFavorite: (favoriteId) => {
      dispatch(deleteArtwork(favoriteId));
    },
  };
};


export default connect((state) => state, mapDispatch)(Profile);

