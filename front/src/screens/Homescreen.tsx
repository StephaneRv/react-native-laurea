import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/adaptive-icon.png")} />
      <Text>Welcome to the home screen !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  logo: {
		marginTop: 60,
    marginBottom: 10,
    width: 200,
    height: 200,
  },
});