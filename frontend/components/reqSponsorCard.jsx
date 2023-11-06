import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ReqSponsorCard = ({ item, handleCardPress }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.cardContainer}>
        <View style={styles.comImg}>
          <Image source={item.companyImage} style={styles.comImge} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sponsorName}>{item.sponsorName}</Text>
          <Text style={styles.expectedCrowd}>
            Expected Crowd: {item.expectedCroud}
          </Text>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={handleCardPress}
          >
            <Text style={styles.requestButtonText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    height: height * 0.2,
    backgroundColor: "#ECF2FF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  comImg: {
    height: "100%",
    width: width * 0.4,
  },
  comImge: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expectedCrowd: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  requestButton: {
    backgroundColor: "#16213E",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  requestButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default ReqSponsorCard;
