import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

import { TouchableOpacity } from "react-native-gesture-handler";
import send from "../assets/images/send.png";

const FeedCard = ({ item }) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: width * 0.05, fontWeight: "bold", flex: 1 }}>
            {item.eventName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: width * 0.03,
                color: "#fff",
                marginTop: height * 0.015,
              }}
            >
              Date: {item.date}
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/trash.png")}
                style={{
                  width: width * 0.08,
                  height: width * 0.08,
                  marginLeft: width * 0.02,
                  marginTop: height * 0.01,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: width * 0.036,
              color: "#526D82",
              marginTop: height * 0.015,
            }}
          >
            Name: {item.userName}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: width * 0.036,
              color: "#526D82",
              marginTop: height * 0.015,
            }}
          >
            Feedback: {item.feedback}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: height * 0.015 }}>
          <TextInput style={styles.replyInput} placeholder="Reply" />
          <TouchableOpacity>
            <Image source={send} style={styles.sendImg} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#9CC5FF",
    width: width * 0.9,
    margin: width * 0.04,
    padding: width * 0.025,
    borderRadius: 16,
  },
  replyInput: {
    backgroundColor: "#F3F4F8",
    borderRadius: 16,
    height: height * 0.06,
    width: width * 0.7,
    marginTop: height * 0.015,
    padding: width * 0.03,
  },
  sendImg: {
    width: width * 0.12,
    height: width * 0.12,
    marginLeft: width * 0.02,
    marginTop: height * 0.015,
  },
});
