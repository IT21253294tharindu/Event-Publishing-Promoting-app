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
const { width, height } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();

  //setters
  const [searchQuery, setSearchQuery] = useState("");
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //fetching data
  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    setFilteredData(eventData);
  }, [eventData]);

  const getAllEvents = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("/event/all", apiConfig)
      .then((response) => {
        setEventData(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //searching
  const handleSearch = () => {
    const filtered = eventData.filter((item) =>
      item.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  //card press
  const handleCardPress = (item) => {
    console.log("Card Pressed");
    console.log(item);
    navigation.navigate("AllEventDetails", { item: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Search for Events"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Image
                source={require("../assets/images/search.png")}
                style={styles.searchBtnImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        {eventData && (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <UserEventCard item={item} handleCardPress={handleCardPress} />
            )}
            idExtractor={(item) => item._id}
            horizontal={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
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
    flex: 1,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: height * 0.02,
    height: height * 0.08,
  },
  searchWrapper: {
    flex: 2,
    backgroundColor: "#D9D9D9",
    marginRight: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: height * 0.04,
    height: "80%",
  },
  searchInput: {
    width: "100%",
    height: "80%",
    paddingHorizontal: width * 0.04,
    marginLeft: width * 0.02,
    borderRadius: height * 0.04,
  },
  searchBtn: {
    width: width * 0.11,
    height: "70%",
    backgroundColor: "#9CC5FF",
    borderRadius: height * 0.013,
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.02,
  },
  searchBtnImage: {
    width: "35%",
    height: "50%",
    tintColor: "white",
  },
  bottomContainer: {
    flex: 18,
    marginHorizontal: width * 0.02,
    borderRadius: height * 0.04,
    marginBottom: height * 0.02,
  },
  flatListContent: {
    paddingHorizontal: width * 0.01,
  },
});
