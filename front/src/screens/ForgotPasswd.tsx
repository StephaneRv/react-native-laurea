import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Appearance,
} from "react-native";

const colorScheme = Appearance.getColorScheme();

export default function ResetPasswordScreen({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={colorScheme == 'light' ? styles.container : styles.container_dark}>
      <Image style={styles.logo} source={require("../../assets/images/short.png")} />
      <Text style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>The reset password feature is not implemented yet.</Text>
      <View style={styles.loginContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="New Password"
            placeholderTextColor="#bbc9bf"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#bbc9bf"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
    marginTop: 60,
    marginBottom: 60,
  },

  inputView: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#0d253f",
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "rgba(13,37,63,0.74)",
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 25,
    shadowOpacity: .50,
  },

  loginContainer: {
    width: "75%",
    position: "relative",
    backgroundColor: "#90cea1",
    alignItems: "center",
    padding: 30,
    shadowColor: "#01b4e4",
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 33,
    shadowOpacity: .74,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    // marginLeft: 20,
  },

  loginBtn: {
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
		marginBottom: 20,
    backgroundColor: "#0d253f",
    shadowColor: "rgba(13,37,63,0.74)",
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 25,
    shadowOpacity: .50,
  },

  loginText: {
		fontStyle: "normal",
    color: "white",
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