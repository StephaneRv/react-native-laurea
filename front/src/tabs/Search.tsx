import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Appearance } from "react-native";
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

  const colorScheme = Appearance.getColorScheme();

  return (
    <>
      <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/long.png")} />
          <Text style={styles.titleText}>Search</Text>
        </View>

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
      </SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  container_dark: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
  },

  logo: {
		marginTop: 20,
    marginBottom: 5,
    resizeMode: "contain",
    height: 20,
  },

  titleContainer: {
    width: "100%",
    position: "relative",
    backgroundColor: "#0d253f",
    alignItems: "center",
    shadowColor: "#01b4e4",
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    shadowOpacity: .74,
  },

  titleText: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    paddingBottom: 15,
  },
});
