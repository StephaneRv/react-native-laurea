import React, { useState } from "react";
import {
  StyleSheet,
  Alert, 
  Text,
  View,
  Image,
  Linking, 
  Modal, 
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Appearance,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import ENV from "../../env";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [answer , setAnswer] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

	const LoginUser = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    axios.post(`${ENV.BACKEND_URL}/login`, {
      user: username,
      password: password
    })
    .then((response) => {
      setAnswer(response.data)
      if (response.data === "Password incorrect") {
        alert("Password incorrect");
        return;
      }
      try {
        AsyncStorage.setItem('@username', username)
      } catch (e) {
          console.log(e)
      }
			navigation.replace('Tabs')
    }).catch(err => {
        setAnswer("User not found")
        console.log("User not found")
    });
  }

  const colorScheme = Appearance.getColorScheme();

  return (
    <SafeAreaView style={colorScheme == 'light' ? styles.safe_lite : styles.safe_dark}>
      <StatusBar barStyle={colorScheme == 'light' ? 'dark-content' : 'light-content'} />
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

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
            >
            <Text style={styles.textStyle}>About</Text>
          </Pressable> 

          <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                TMDB clone application{"\n"}LAUREA UAS{"\n"}
              </Text>
              <Text style={styles.modalText}>
                Students:{"\n"}Joel Isotalo{"\n"}Igor
                Rautiainen{"\n"}Stéphane Riveaux{"\n"}Kimberly Ruohio{"\n"}
              </Text>
              <Text style={styles.modalText}>
                Teacher:{"\n"}Paresh Rathod{"\n"}
                {"\n"}2022{"\n"}
              </Text>
              <Text style={styles.modalText}>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
              The information in this application is brought to you by:
              </Text>
              <Text style={styles.modalText} onPress={() => Linking.openURL('https://www.themoviedb.org')}>
                The Movie Database
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>          

        </View>
      
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe_lite: {
    backgroundColor: "#fff",
  },

  safe_dark: {
    backgroundColor: "#0d253f",
  },

  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },

  container_dark: {
    backgroundColor: "#0d253f",
    height: "100%",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    // backgroundColor: "#0d253f",
    shadowColor: "rgba(13,37,63,0.74)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 25,
    shadowOpacity: 0.5,
  },
  buttonClose: {
    width: 100,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#0d253f",
    shadowColor: "rgba(13,37,63,0.74)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 25,
    shadowOpacity: 0.5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});