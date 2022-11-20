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

     //Add your computer's internal IPv4 address here
    axios.post("http://192.168.1.206:3000/register", {
      user: username,
      password: password
    })
    .then((response) => {
      // console.log(response);
      if (response.status === 201) {
			  navigation.replace('Tabs')
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/images/adaptive-icon.png")} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
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

  registerBtn: {
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
		marginBottom: 20,
    backgroundColor: "#FF1493",
  },

	registerText: {
		fontStyle: "normal",
	},
});