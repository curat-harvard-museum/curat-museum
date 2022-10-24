// import React, { useState, useEffect } from "react";
// import audioObject from "./AudioObject";
// import {
//   Center,
//   Flex,
//   Heading,
//   Image,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";

// export default function Audio() {
//   const apiLink = `https://api.harvardartmuseums.org/audio?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`;
//   const [isLoading, setIsLoading] = useState(true);
//   const [audio, setAudio] = useState([]);

//   const fetchAudio = async () => {
//     await fetch(apiLink)
//       .then((res) => res.json())
//       .then((data) => {
//         let audioArr = data.records.filter((file) =>
//           file.primaryurl.includes(".mp3")
//         );
//         let newArr = audioArr.map((x, i) => {
//           return { sound: x, image: audioObject[i] };
//         });
//         setAudio(newArr);
//       })
//       .catch((error) => console.log(error));
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchAudio();
//   }, []);

//   return (
//     <div className="audio" id="audios">
//       <Heading textAlign={"center"}>Artwork Audio Descriptions</Heading>
//       <Center py={6}>
//         <div className="audio-container">
//           {!isLoading ? (
//             audio.map((record) => (
//               <div key={record.sound.fileid}>
//                 <Stack
//                   borderWidth="1px"
//                   borderRadius="lg"
//                   w={{ sm: "100%", md: "700px" }}
//                   height={{ sm: "750px", md: "20rem" }}
//                   direction={{ base: "column", md: "row" }}
//                   bg={useColorModeValue("white", "gray.900")}
//                   boxShadow={"2xl"}
//                   padding={4}
//                 >
//                   <Flex>
//                     <Image
//                       margin-left="auto"
//                       margin-right="auto"
//                       width="100%"
//                       src={record.image?.baseimageurl}
//                       className="audio-image"
//                       key={record.image?.id}
//                       alt="art piece"
//                     />
//                   </Flex>
//                   <Stack
//                     flex={1}
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     p={1}
//                     pt={2}
//                   >
//                     <Stack>
//                       <Text
//                         fontWeight={600}
//                         textAlign={"center"}
//                         size="sm"
//                         mb={4}
//                       >
//                         Title: {record.image?.title}
//                       </Text>
//                       <Text
//                         className="audio-transcript"
//                         textAlign={"center"}
//                         px={3}
//                       >
//                         {record.sound.description}
//                       </Text>
//                     </Stack>
//                     <br></br>
//                     <audio controls>
//                       <source src={record.sound.primaryurl} type="audio/mpeg" />
//                       Your browser does not support the audio element.
//                     </audio>
//                   </Stack>
//                 </Stack>
//               </div>
//             ))
//           ) : (
//             <h1>Loading....</h1>
//           )}
//         </div>
//       </Center>
//     </div>
//   );
// }
