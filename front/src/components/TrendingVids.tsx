import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { VideoThumbnail, VideoTitle } from "./VideoUtils";
import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 5;

export default function TrendingVideos() {
  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([""]);
  const [thumbnails, setThumbnails] = useState([""]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${MAX_RESULT}&key=${YOUTUBE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data.items);
        let titles = [];
        let thumbnails = [];
        for (let i = 0; i < data.items.length; i++) {
          titles.push(data.items[i].snippet.title);
          thumbnails.push(`http://img.youtube.com/vi/${data.items[i].id}/hqdefault.jpg`)
        }
        setTitles(titles);
        setThumbnails(thumbnails);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

	const displayVideo = (videoId: string) => {
		console.log("video id:", videoId);
		// console.log("UWUUUUUUU")
	}

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) :
          videos.map((video: any, index) => {
            return (
							<View key={index}>
                <VideoTitle>{titles[index]}</VideoTitle>
								<TouchableOpacity onPress={() => displayVideo(video.id)}>
	                <VideoThumbnail source={{ uri: thumbnails[index] }}/>
								</TouchableOpacity>
							</View>
						)
          }
        )}

      </ScrollView>
    </SafeAreaView>
  );
}