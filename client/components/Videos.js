import React, { useState, useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiLink = `https://api.harvardartmuseums.org/video/?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`;

  const fetchVideo = async () => {
    await fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setVideos(data.records))
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="video" id="videos">
      <Heading textAlign={"center"}>Museum Video Collection</Heading>
      <div className="video-box">
        {!isLoading ? (
          videos.map((video) => (
            <div key={video.videoid} className="video-container">
              <iframe
                src={`https://player.vimeo.com/video/${video.primaryurl.replace(
                  "https://vimeo.com/",
                  ""
                )}?title=0&byline=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={video.description}
                className="iframe"
              ></iframe>
              <div className="video-description">
                <p>{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <Text>Loading....</Text>
        )}
      </div>
    </div>
  );
}
