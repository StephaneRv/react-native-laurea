import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Appearance } from "react-native";
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

import { VideoThumbnail, VideoTitle } from "../components/VideoUtils";

// import YOUTUBE_API_KEY from "../../env";
import ENV from "../../env";

export default function Search() {

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [titles, setTitles] = useState([""]);
  const [thumbnails, setThumbnails] = useState([""]);

  const navigation = useNavigation();

  const colorScheme = Appearance.getColorScheme();

  const searchMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ENV.TMDB_API_KEY}&query=${search}&page=1&include_adult=false`)
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
  }

  return (
    <>
      <SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/long.png")} />
          <Text style={styles.titleText}>Search</Text>
        </View>
        <SearchContainer>
          <SearchInput
            placeholder="Search for a movie..."
            onChangeText={text => setSearch(text)}
            value={search}
            onSubmitEditing={searchMovies}
          />
          {/* <TouchableOpacity onPress={searchMovies}> /!\ Commented this because it crashes when clicked, idk why so you have to press enter to validate
            <Ionicons name="search" size={30} color="black" />
          </TouchableOpacity> */}
        </SearchContainer>
        <ScrollView style={styles.scrollContainer}>
          {movies.map((movie, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Movie', { movie: movie, thumbnail: thumbnails[index] })}>
              <Image key={index} style={styles.thumbnail} source={{ uri: thumbnails[index] ? thumbnails[index] : null }} />
              <VideoTitle>{titles[index]}</VideoTitle>
            </TouchableOpacity>
          ))}
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
    shadowRadius: 5,
    shadowOpacity: .25,
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
    color: '#000',
    textAlign: "center",
  },

  text_dark: {
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },

  scrollContainer: {
    width: "100%",
    marginTop: 10,
  },

  thumbnail: {
    width: "100%",
    height: 600,
    resizeMode: "cover",
  },

});
