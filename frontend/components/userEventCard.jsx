import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const UserEventCard = ({ item, handleCardPress }) => {
  const totalStars = 5;
  const randomNum = Math.floor(Math.random() * totalStars) + 1;

  return (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.eventImage}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.eventName}</Text>
          <Text>Event Date: {item.date}</Text>
          {/* <Text>Event Location: {item.location}</Text> */}
          <Text>Time: {item.time}</Text>
          <View style={styles.ratingBar}>
            {Array.from({ length: randomNum }, (x, i) => {
              return (
                <MaterialIcons key={i} name="star" size={30} color="#FFA000" />
              );
            })}

            {Array.from({ length: totalStars - randomNum }, (x, i) => {
              return (
                <MaterialIcons
                  key={i}
                  name="star-border"
                  size={30}
                  color="#FFA000"
                />
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserEventCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: height * 0.01,
    flexDirection: "row",
    backgroundColor: "#ECF2FF",
    borderRadius: width * 0.04,
    padding: width * 0.02,
  },
  imageContainer: {
    flex: 1,
    height: width * 0.4,
    width: width * 0.4,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    margin: width * 0.02,
    gap: height * 0.01,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  ratingBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
