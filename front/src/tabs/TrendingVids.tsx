import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image, Appearance } from "react-native";
import { VideoTitle } from "../components/VideoUtils";
import { useNavigation } from '@react-navigation/native'

import ENV from "../../env";

const TMDB_API_KEY = ENV.TMDB_API_KEY;

export default function TrendingVideos() {

  const [movies, setMovies] = useState([]);
  const [titles, setTitles] = useState([""]);
  const [thumbnails, setThumbnails] = useState([""]);

  const navigation = useNavigation();

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        let titles = [];
        let thumbnails = [];
        for (let i = 0; i < data.results.length; i++) {
          titles.push(data.results[i].title);
          thumbnails.push(`https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`)
        }
        setTitles(titles);
        setThumbnails(thumbnails);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <>
      <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/long.png")} />
          <Text style={styles.titleText}>Trending Movies</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {movies.map((movie, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Movie', { movie: movie, thumbnail: thumbnails[index] })}>
              <View style={styles.imageContainer}>
                <Image key={index} style={styles.thumbnail} source={{ uri: thumbnails[index] ? thumbnails[index] : null }} />
              </View>
              <VideoTitle style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>{titles[index]}</VideoTitle>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
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
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: .25,
  },

  imageContainer: {
    shadowColor: "#01b4e4",
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 20,
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
    marginTop: 30,
    color: '#000',
    textAlign: "center",
  },

  text_dark: {
    marginBottom: 20,
    marginTop: 30,
    color: "#fff",
    textAlign: "center",
  },

  scrollContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  thumbnail: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    alignSelf: "center",
  },
});