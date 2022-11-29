import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image, Appearance } from "react-native";
import { VideoThumbnail, VideoTitle } from "../components/VideoUtils";
import { useNavigation } from '@react-navigation/native'

import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 10;

export default function TrendingVideos() {
  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([""]);
  const [thumbnails, setThumbnails] = useState([""]);

  const [loading, setLoading] = useState(true);

	const navigation = useNavigation();

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${MAX_RESULT}&key=${YOUTUBE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data.items);
        let titles = [];
        let thumbnails = [];
        for (let i = 0; i < data.items.length; i++) {
					// console.log("SUUUU: ", data.items[i]);
          titles.push(data.items[i].snippet.title);
          thumbnails.push(`http://img.youtube.com/vi/${data.items[i].id}/hqdefault.jpg`)
        }
        setTitles(titles);
        setThumbnails(thumbnails);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={require("../../assets/images/long.png")} />
        <Text style={styles.titleText}>Trending</Text>
      </View>
    
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) :
          videos.map((video: any, index) => {
            return (
							<View key={index}>
								<TouchableOpacity
										onPress={() => navigation.navigate("VideoViewer", {
											video: video,
											isFromSearchTab: false
										})
									}>
	                <VideoThumbnail source={{ uri: thumbnails[index] }}/>
								</TouchableOpacity>
								<VideoTitle style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>{titles[index]}</VideoTitle>
							</View>
						)
          }
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  container_dark: {
    backgroundColor: "#0d253f",
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

  text_light: {
    marginBottom: 20,
    color: '#000'
  },

  text_dark: {
    marginBottom: 20,
    color: "#fff"
  }
});