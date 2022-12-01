import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Appearance,
} from "react-native";

const colorScheme = Appearance.getColorScheme();

//I can't get navigation going on this page.

export default function Account({ navigation }) {

  return (
    <View style={colorScheme == 'light' ? styles.container : styles.container_dark}>
      <Image style={styles.logo} source={require("../../assets/images/short.png")} />
      <Text style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>Wow, such empty.</Text>
    </View>
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
    fontStyle: "normal",
    color: "#fff",
  },

  logo: {
    marginTop: 100,
    marginBottom: 60,
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