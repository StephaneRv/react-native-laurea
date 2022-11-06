import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TrendingVideos from "../components/TrendingVids";

import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 5;

export default function Home() {

  const [videoIds, setVideoIds] = useState([]);
  const [videoTitle, setVideoTitle] = useState();
  const [searched, setSearched] = useState(false);

  return (
    <>
      <SafeAreaView>
        <SearchContainer>
          <Ionicons name="search" size={20} color="#000" />
          <SearchInput
            placeholder="Search video"
            onChangeText={setVideoTitle}
            value={videoTitle}
            onSubmitEditing={() => {
              setSearched(true);
              fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULT}&q=${videoTitle}&key=${YOUTUBE_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  setVideoIds(data.items.map(item => item.id.videoId));
                })
                .catch(error => {
                  console.error(error);
                });
            }}
          />
        </SearchContainer>
      </SafeAreaView>
      <ScrollView>
        <VideoView>
          { searched ? videoIds.map((videoId, index) => (
            <YoutubePlayer
              key={index}
              height={270}
              play={false}
              videoId={videoId}
            />
          ))
          : <TrendingVideos/> }
        </VideoView>
      </ScrollView>
    </>
  );
}

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 0 8px;
  margin: 10px 20px;
  border-radius: 30px;
`;

const SearchInput = styled.TextInput`
  padding: 2px;
  margin: 12px;
`;

const VideoView = styled.View`
  padding-top: 10px;
`;