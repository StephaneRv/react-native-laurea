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

import axios from "axios";
import ENV from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState<boolean>();

  const CreateUser = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios.post(`${ENV.BACKEND_URL}/register`, {
      user: username,
      password: password
    })
    .then((response) => {
      // console.log(response);
      if (response.status === 201) {
        try {
          AsyncStorage.setItem('@username', username)
        } catch (e) {
            console.log(e)
        }
			  navigation.replace('Tabs')
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  }

  const colorScheme = Appearance.getColorScheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={colorScheme == 'light' ? styles.container : styles.container_dark}>
        <Image style={styles.logo} source={require("../../assets/images/full.png")} />

        <View style={styles.loginContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email Address"
              placeholderTextColor="#bbc9bf"
              onChangeText={(username) => setUsername(username)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#bbc9bf"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#bbc9bf"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            />
          </View>

          <TouchableOpacity style={styles.registerBtn} onPress={ () => CreateUser()}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

			    <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.forgot_button}>Already have an account? Login</Text>
          </TouchableOpacity>
            {/* <Text>{success ? "Account created successfully" : ""}</Text> */}
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

	touchableOpacity: {
		// marginBottom: 20,
	},

  forgot_button: {
    height: 30,
    // marginBottom: 30,
		// underline text
		textDecorationLine: 'underline',
  },

  registerBtn: {
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

	registerText: {
		fontStyle: "normal",
    color: "white",
	},
});