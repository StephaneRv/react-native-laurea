import React from "react";
import { Image, Appearance, SafeAreaView, ScrollView, StyleSheet, Text, Linking } from "react-native";
import { VideoTitle, VideoDescription, } from "./VideoUtils";

const colorScheme = Appearance.getColorScheme();

export default function VideoViewer({ route }) {

  return (
    <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
      <ScrollView style={styles.scrollContainer}>
        <Image style={styles.thumbnailContainer} source={{ uri: route.params.thumbnail }} />
        <VideoTitle style={colorScheme == 'light' ? styles.movieTitle_light : styles.movieTitle_dark}>{route.params.movie.title}</VideoTitle>
        <VideoDescription>{route.params.movie.overview}</VideoDescription>
        <Text style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>
          Release Date: {route.params.movie.release_date}
        </Text>
        <Text style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>Rating: {route.params.movie.vote_average}</Text>
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
    textAlign: "center",

	  },

	  text_dark: {
		marginBottom: 20,
		color: "#fff",
    textAlign: "center",

	  },
    
    movieTitle_light: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 20,
      paddingBottom: 10,
    },
  
    movieTitle_dark: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 20,
      paddingBottom: 10,
      textAlign: "center",
      color: "#fff",
    },

    scrollContainer: {
        width: "100%",
        padding: 10,
    },

    thumbnailContainer: {
      width: "100%",
      height: 500,
      resizeMode: "contain",
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: "#01b4e4",
      shadowOffset: {width: 2, height: 2},
      shadowRadius: 20,
      shadowOpacity: .74,
    },

    image: {
      width: 25,
      resizeMode: "contain",
    },
});