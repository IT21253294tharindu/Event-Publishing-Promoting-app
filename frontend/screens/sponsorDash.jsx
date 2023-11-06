import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
const { width, height } = Dimensions.get("window");
import SponsorCard from "../components/sponsorCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SponsorDash = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  useEffect(() => {
    getSponsorships();
  }, []);

  const getSponsorships = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("/sponsor/all/my", apiConfig)
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlePublish = () => {
    navigation.navigate("PublishSponsorship");
  };

  handleCardPress = (item) => {
    navigation.navigate("SponsorDetailView", { item: item });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.addImgContainer}
          onPress={handlePublish}
        >
          <Image
            source={require("../assets/images/add.png")}
            style={styles.addImg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.tittle}>Your List</Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <SponsorCard item={item} handleCardPress={handleCardPress} />
          )}
          itemExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default SponsorDash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 1,
    bottom: height * 0.05,
    top: height * 0.05,
  },
  addImgContainer: {
    width: width * 0.5,
    height: height * 0.5,
    left: width * 0.1,
  },
  addImg: {
    width: width * 0.25,
    height: height * 0.15,
  },
  bottomContainer: {
    flex: 3,
    padding: width * 0.05,
  },
  tittle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.02,
  },
  flatListContent: {
    gap: height * 0.02,
  },
});
