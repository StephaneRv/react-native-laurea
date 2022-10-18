import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import axios from "axios";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ResetPasswordScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/adaptive-icon.png")} />
      <Text>The reset password feature is not implemented yet.</Text>
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