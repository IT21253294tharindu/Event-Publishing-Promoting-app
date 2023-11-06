import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
const { width, height } = Dimensions.get("window");
import SponsorCard from "../components/sponsorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PublishAllSponsors = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getSponsorships();
  }, []);

  const handleCardPress = (item) => {
    console.log(item);
  };

  const getSponsorships = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("/sponsor/all", apiConfig)
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.tittle}>Publish All Sponsors</Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <SponsorCard item={item} handleCardPress={handleCardPress} />
          )}
          idExtractor={(item) => item._id}
          horizontal={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tittle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
  },
  flatListContent: {
    gap: width * 0.02,
    margin: width * 0.04,
  },
});

export default PublishAllSponsors;
