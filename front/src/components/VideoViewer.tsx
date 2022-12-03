import React, { useState } from "react";
import { Image, Appearance, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components';
import { VideoAuthor, VideoTitle, VideoDescription, VideoThumbnail } from "./VideoUtils";

const colorScheme = Appearance.getColorScheme();

export default function VideoViewer({ route }) {

  return (
    <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
      <ScrollView style={styles.scrollContainer}>
        <Image style={styles.thumbnailContainer} source={{ uri: route.params.thumbnail }} />
        <VideoTitle>{route.params.movie.title}</VideoTitle>
        <VideoDescription>{route.params.movie.overview}</VideoDescription>
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

	  text_light: {
		marginBottom: 20,
		color: '#000',

	  },

	  text_dark: {
		marginBottom: 20,
		color: "#fff",

	  },

    scrollContainer: {
        width: "100%",
        padding: 10,
    },

    thumbnailContainer: {
      width: "100%",
      height: 600,
      resizeMode: "cover",
      marginBottom: 10,
      borderRadius: 10,
    },
});