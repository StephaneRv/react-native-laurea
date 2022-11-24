import React, { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "react-native";
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

import { VideoThumbnail, VideoTitle } from "../components/VideoUtils";

import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 10;

export default function Search() {

  const [query, setQuery] = useState();
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([""]);
  const [thumbnails, setThumbnails] = useState([""]);

	const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <SearchContainer>
          <Ionicons name="search" size={20} color="#000" />
          <SearchInput
            placeholder="Search movies, tv, or people here"
            placeholderTextColor="#bbc9bf"
            onChangeText={setQuery}
            value={query}
            onSubmitEditing={() => {
              fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULT}&q=${query}&key=${YOUTUBE_API_KEY}`)
              .then(res => res.json())
              .then(data => {
                setVideos(data.items);
                let titles = [];
                let thumbnails = [];
                for (let i = 0; i < data.items.length; i++) {
                  titles.push(data.items[i].snippet.title);
                  thumbnails.push(`http://img.youtube.com/vi/${data.items[i].id.videoId}/hqdefault.jpg`)
                }
                setTitles(titles);
                setThumbnails(thumbnails);
                setSearched(true);
                setLoading(false);
              })
              .catch(err => console.log(err));
            }}
          />
        </SearchContainer>
      </SafeAreaView>
      <ScrollView>
          { searched ?
            ( loading ?
              <Text>Loading...</Text>
              : videos.map((video: any, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("VideoViewer", {
                        video: video,
                        isFromSearchTab: true
                      })
                    }>
                      <VideoThumbnail source={{ uri: thumbnails[index] }}/>
                    </TouchableOpacity>
                    <VideoTitle>{titles[index]}</VideoTitle>
                  </View>
                )
              }
            )
          ) : null}
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

