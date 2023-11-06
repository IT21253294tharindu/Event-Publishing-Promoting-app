import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";

const UserFeedbackCard = ({ item }) => {
  const totalStars = 5;
  const gainStars = 2;

  return (
    <View style={styles.feedbackCardContainer} key={item.id}>
      <View style={styles.userData}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.userImg}
        />
        <Text style={styles.userName}>{item.createUser.userName}</Text>
      </View>
      <Text style={styles.feedbackText}>{item.feedback}</Text>
      <View style={styles.ratingBar}>
        {Array.from({ length: item.rating }, (x, i) => {
          return (
            <MaterialIcons key={i} name="star" size={30} color="#FFA000" />
          );
        })}

        {Array.from({ length: totalStars - item.rating }, (x, i) => {
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
  );
};

export default UserFeedbackCard;

const styles = StyleSheet.create({
  feedbackCardContainer: {
    backgroundColor: "#ECF2FF",
    borderRadius: width * 0.04,
    height: height * 0.12,
    width: width * 0.9,
    marginHorizontal: width * 0.01,
    flexDirection: "column",
  },
  userData: {
    flexDirection: "row",
    gap: width * 0.08,
    top: height * 0.01,
  },
  userImg: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: width * 0.04,
    left: width * 0.04,
  },
  userName: {
    fontSize: width * 0.036,
    fontWeight: "bold",
    left: width * 0.04,
  },
  feedbackText: {
    fontSize: width * 0.03,
    left: width * 0.04,
    top: height * 0.02,
  },
  ratingBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
    top: height * 0.005,
  },
});
