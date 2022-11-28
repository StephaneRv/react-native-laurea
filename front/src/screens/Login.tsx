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


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [answer , setAnswer] = useState<string>();

	const LoginUser = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    //Add your computer's internal IPv4 address here
    axios.post("http://192.168.1.206:3000/login", {
      user: username,
      password: password
    })
    .then((response) => {
			setAnswer(response.data)
			navigation.replace('Tabs')
    }).catch(err => { // Handle errors if backend is not running
        setAnswer("User not found")
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
              placeholder="Username"
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

          <TouchableOpacity style={styles.loginBtn} onPress={ () => LoginUser()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

			    <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.forgot_button}>Don't have an account? Create one</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
			      {/* <Text>{answer ? answer : ""}</Text> */}
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
    backgroundColor: "black",
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
});