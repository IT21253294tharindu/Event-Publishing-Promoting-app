import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { TextInput, Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [accountType, setAccountType] = useState("");

  const handleBack = () => {
    navigation.navigate("Login");
  };

  const accountTypes = [
    {
      label: "General",
      value: "General",
    },
    {
      label: "Organizer",
      value: "Organizer",
    },
    {
      label: "Sponsor",
      value: "Sponsor",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Image
                source={require("../assets/images/loginBackground.png")}
                resizeMode="cover"
                style={styles.imageCover}
              />
              <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
                <Image source={require("../assets/images/backIcon.png")} />
              </TouchableOpacity>
              <Text style={styles.tittle}>Create{"\n"} Account</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Name"
                  mode="outlined"
                  placeholder="Name"
                  style={styles.input}
                />
                <TextInput
                  label="Email"
                  mode="outlined"
                  placeholder="Email"
                  style={styles.input}
                />
                <TextInput
                  label="Password"
                  mode="outlined"
                  placeholder="Enter password"
                  secureTextEntry={true}
                  style={styles.input}
                />
                <TextInput
                  label="Confirm Password"
                  mode="outlined"
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  style={styles.input}
                />
                <DropDown
                  label={"Account Type"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={accountType}
                  setValue={setAccountType}
                  list={accountTypes}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                  style={styles.input}
                />
                <TextInput
                  label="Phone number"
                  mode="outlined"
                  placeholder="Phone number"
                  style={styles.input}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signButton}
                  onPress={handleBack}
                >
                  <Text style={styles.signButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  imageCover: {
    height: height * 0.5,
    width: "100%",
  },
  btnBack: {
    position: "absolute",
    top: "10%", // 10% of the screen height from the top
    left: "1%",
  },
  tittle: {
    position: "absolute",
    top: "38%", // 38% of the screen height from the top
    left: "4%", // 25% of the screen width from the left
    fontSize: width * 0.1, // 10% of the screen width as font size
    fontWeight: "bold",
    color: "#fff",
  },
  formContianer: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  inputContainer: {
    margin: width * 0.08,
    gap: 11,
  },
  buttonContainer: {
    marginTop: height * 0.001,
  },
  registerButton: {
    backgroundColor: "#16213E",
    padding: width * 0.03,
    borderRadius: width * 0.1,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
    marginTop: height * 0.001,
  },
  registerButtonText: {
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
    marginBottom: height * 0.01,
  },
  signButtonText: {
    color: "#070A35",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default SignUp;
