import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();

  //================Variables=================//
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //================Functions=================//
  const handleSignUpBtn = () => {
    navigation.navigate("SignUp");
  };

  const handleBack = () => {
    navigation.navigate("GetStarted");
  };

  const handleLogin = () => {
    const data = {
      email: userName,
      password: password,
    };

    axios
      .post("/auth/login", data)
      .then(async (response) => {
        if (response.data.token) {
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem("accType", response.data.accountType);
          console.log(response.data);
          navigation.navigate("GeneralNavigation");
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show("Incorrect Credentials", { duration: Toast.durations.LONG });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/images/loginBackground.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={require("../assets/images/backIcon.png")} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome{"\n"} back</Text>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.inputContainer}>
            <TextInput
              label="Username"
              mode="outlined"
              placeholder="Enter username"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              label="Password"
              mode="outlined"
              placeholder="Enter password"
              secureTextEntry={true}
              style={styles.passwordInput}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signButton} onPress={handleSignUpBtn}>
            <Text style={styles.signButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.45,
  },
  backButton: {
    position: "absolute",
    top: "10%",
    left: "1%",
  },
  welcomeText: {
    position: "absolute",
    top: "38%",
    left: "5%",
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    margin: width * 0.08,
  },
  passwordInput: {
    marginTop: height * 0.02,
  },
  forgotPassword: {
    marginTop: height * 0.02,
    left: "68%",
  },
  forgotPasswordText: {
    color: "#8D7AAA",
  },
  buttonContainer: {
    marginTop: height * 0.001,
    marginBottom: height * 0.02,
  },
  loginButton: {
    backgroundColor: "#16213E",
    padding: width * 0.03,
    borderRadius: width * 0.1,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
    marginTop: height * 0.001,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  signButton: {
    alignItems: "center",
    marginTop: height * 0.02,
    backgroundColor: "#A5B2D2",
    padding: width * 0.03,
    width: "45%",
    alignSelf: "center",
    borderRadius: width * 0.1,
  },
  signButtonText: {
    color: "#070A35",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});
