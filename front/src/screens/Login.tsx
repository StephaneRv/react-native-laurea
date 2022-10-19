import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
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
    axios.post("http://localhost:3000/login", {
      username: username,
      password: password
    })
    .then((response) => {
      // console.log(response);
			setAnswer(response.data)
			navigation.navigate('Home')
    }).catch(err => { // Handle errors if backend is not running
        setAnswer("User not found")
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/adaptive-icon.png")} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
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
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
			{/* <Text>{answer ? answer : ""}</Text> */}
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

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
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
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
		marginBottom: 20,
    backgroundColor: "#FF1493",
  },

	loginText: {
		fontStyle: "normal",
	},
});