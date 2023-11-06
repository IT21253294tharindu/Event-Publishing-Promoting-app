import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

const SponsorCard = ({ item, handleCardPress }) => {
  return (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/sampleCompany.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Sponsorship: {item.sponsorship}</Text>
          <Text style={styles.detailTxt}>Estimated Budget: {item.budget}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SponsorCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: height * 0.01,
    flexDirection: "row",
    backgroundColor: "#ECF2FF",
    borderRadius: width * 0.03,
    paddingTop: height * 0.01,
    paddingBottom: height * 0.01,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    height: width * 0.17,
    width: width * 0.17,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    gap: height * 0.01,
  },
  title: {
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  detailTxt: {
    fontSize: width * 0.03,
  },
});
