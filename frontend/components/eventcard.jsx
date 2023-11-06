import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Eventcard = ({ item, handleCardPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Image
         source={{ uri: `data:image/jpeg;base64,${item.images[0]}` }}
        style={styles.image}
      />
      <Text style={styles.eventName} numberOfLines={1}>
        {item.eventName}
      </Text>
      <View style={styles.details}>
        {/* <Text style={styles.detailText}>{item.location}</Text> */}
        <Text style={styles.detailText}>{item.eventType}</Text>
        <Text style={styles.detailText}>{item.date}</Text>
      </View>
      <View style={styles.ticketcontainer}>
        <View style={styles.ticketItem}>
          <Text style={styles.ticketLabel}>Sold Tickets:</Text>
          <Text style={styles.ticketValue}>{item.soldTickets} sold</Text>
        </View>
        <View style={styles.ticketItem}>
          <Text style={styles.ticketLabel}>Available Tickets:</Text>
          <Text style={styles.ticketValue}>{item.ticketCount} available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E1F5FE",
    padding: 16,
    borderRadius: 8,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "DMBold",
  },
  details: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "DMRegular",
  },
  ticketcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  ticketItem: {
    alignItems: "center",
  },
  ticketLabel: {
    fontSize: 14,
    color: "#555",
    fontFamily: "DMRegular",
  },
  ticketValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16213E",
    fontFamily: "DMMedium",
  },
});

export default Eventcard;
