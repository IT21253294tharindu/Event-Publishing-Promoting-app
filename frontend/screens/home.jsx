import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import UserEventCard from "../components/userEventCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationEventEmitter } from "expo-location/build/LocationEventEmitter";
import Maps from "../components/Maps";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();

  //setters
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getEventData();
  }, []);

  //get event data
  const getEventData = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`event/all/future`, apiConfig)
      .then((response) => {
        console.log(response.data);
        setEventData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  //card press
  const handleCardPress = (item) => {
    console.log("Card Pressed");
    console.log(item);
    navigation.navigate("GeneralEventDetails", { item: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Maps />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Upcoming Events</Text>

        <FlatList
          data={eventData}
          renderItem={({ item }) => (
            <UserEventCard item={item} handleCardPress={handleCardPress} />
          )}
          idExtractor={(item) => item.id}
          horizontal={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topContainer: {
    flex: 5,
  },

  map: {
    top: height * 0.035,
    width: width * 1,
    height: 300,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: width * 0.06,
  },
  bottomContainer: {
    flex: 2,
    shadowColor: "#000",
    marginHorizontal: width * 0.02,
    borderRadius: height * 0.04,
    marginBottom: height * 0.02,
  },
  title: {
    fontWeight: "bold",
    fontSize: width * 0.06,
    marginHorizontal: width * 0.02,
    marginBottom: height * 0.02,
  },
  flatListContent: {
    paddingHorizontal: width * 0.01,
  },
});
