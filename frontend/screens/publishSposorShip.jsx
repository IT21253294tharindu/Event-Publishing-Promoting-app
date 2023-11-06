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
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const PublishSponsorship = () => {
  const navigation = useNavigation();
  const [accountType, setAccountType] = useState("");

  //////////////////////////////////////////////////////////
  const [sponsorship, setSponsoship] = useState("");
  const [budget, setBudget] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleBack = () => {
    navigation.goBack();
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

  const handleLogin = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    const data = {
      sponsorship: sponsorship,
      budget: budget,
      eventType: eventType,
      location: location,
      description: description,
    };

    axios
      .post("/sponsor/create", data, apiConfig)
      .then((response) => {
        console.log(response.data);
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image
              source={require("../assets/images/sampleCompany.png")}
              resizeMode="cover"
              style={styles.imageCover}
            />
            <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
              <Image
                source={require("../assets/images/btnBack.png")}
                style={styles.backImg}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Sponsorship"
                mode="outlined"
                placeholder="Sponsorship"
                style={styles.input}
                onChangeText={(text) => setSponsoship(text)}
              />
              <TextInput
                label="Budget"
                mode="outlined"
                placeholder="Budget"
                style={styles.input}
                onChangeText={(text) => setBudget(text)}
              />
              <TextInput
                label="Event Type"
                mode="outlined"
                placeholder="Event Type"
                style={styles.input}
                onChangeText={(text) => setEventType(text)}
              />
              <TextInput
                label="location"
                mode="outlined"
                placeholder="location"
                style={styles.input}
                onChangeText={(text) => setLocation(text)}
              />
              <TextInput
                label="Description"
                mode="outlined"
                placeholder="Description"
                style={styles.input}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleLogin}
              >
                <Text style={styles.registerButtonText}>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signButton} onPress={handleBack}>
                <Text style={styles.signButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    height: height * 0.27,
    width: "50%",
    alignSelf: "center",
  },
  backImg: {
    width: width * 0.05,
    height: height * 0.03,
  },
  btnBack: {
    position: "absolute",
    top: "10%",
    left: "4%",
  },

  formContainer: {
    flex: 3,
    backgroundColor: "#ffff",
  },
  inputContainer: {
    margin: width * 0.08,
  },
  input: {
    marginBottom: height * 0.01,
  },
  buttonContainer: {
    marginTop: height * 0.008,
    bottom: height * 0.02,
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

export default PublishSponsorship;
