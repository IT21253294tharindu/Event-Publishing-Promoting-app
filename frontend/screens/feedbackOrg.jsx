import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");
import FeedCard from "../components/feedCard";
const FeedbackOrg = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackData, setFeedbackData] = useState([
    {
      id: "1",
      eventName: "wiramaya",
      userName: "John Doe",
      date: "2021-05-01",
      feedback: "This is a very good event. I really enjoyed it.",
      userImage: require("../assets/images/user.png"),
      rating: "1",
    },
    {
      id: "2",
      userName: "Doe",
      eventName: "wiramaya",
      date: "2021-05-01",
      feedback: "This is a very good event. I really enjoyed it.",
      userImage: require("../assets/images/user.png"),
      rating: "2",
    },
    {
      id: "3",
      userName: "John Doe",
      eventName: "React Native",
      date: "2021-05-01",
      feedback: "This is a very good event. I really enjoyed it.",
      userImage: require("../assets/images/user.png"),
      rating: "3",
    },
    {
      id: "4",
      userName: "John Doe",
      eventName: "ExpoGo",
      date: "2021-05-01",
      feedback: "This is a very good event. I really enjoyed it.",
      userImage: require("../assets/images/user.png"),
      rating: "4",
    },
  ]);
  const [filteredFeedback, setFilteredFeedback] = useState(feedbackData);

  const handleSearch = () => {
    const filtered = feedbackData.filter((item) =>
      item.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFeedback(filtered);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              placeholder="Search for feedbacks"
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

        <FlatList
          data={filteredFeedback}
          renderItem={({ item }) => <FeedCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={false}
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
  searchContainer: {
    flexDirection: "row",
    marginTop: height * 0.02,
    height: height * 0.07,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    marginRight: height * 0.01,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.04,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: width * 0.04,
    marginLeft: width * 0.04,
    borderRadius: width * 0.04,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#9CC5FF",
    borderRadius: width * 0.04,
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.04,
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "white",
  },
});

export default FeedbackOrg;
