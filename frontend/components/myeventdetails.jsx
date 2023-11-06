import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item}` }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );

  function updateevent(event) {
    navigation.navigate("UpdateEvent", { eventId: event._id });
  }

  const deleteevent = async (event) => {
    const id = event._id;

    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.delete(`/event/delete/${id}`, apiConfig);

      console.log("deletion successfully!");
      //console.log(response.data);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollViewContent}>
        <View>
          <FlatList
            data={event.images}
            renderItem={renderItem}
            horizontal={true}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.titlecontainer}>
            <Text style={styles.eventheader}>Event Details</Text>
          </View>

          <View style={styles.eventdetailscontainer}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 6,
                  marginTop: height * 0.02,
                }}
              >
                <Text style={styles.eventtitle}>Date:</Text>
                <Text style={styles.eventdetails}> {event.date}</Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", gap: 6, marginTop: height * 0.02 }}
            >
              <Text style={styles.eventtitle}>Event Name:</Text>
              <Text style={styles.eventdetails}> {event.eventName}</Text>
            </View>

           
            <View style={{ gap: 10, marginTop: height * 0.05 }}>
              <Text style={styles.eventtitle}>Event Description:</Text>
              <Text style={styles.eventdescription}> {event.description}</Text>
            </View>
            <View style={{ gap: 10, marginTop: height * 0.05 }}>
              <Text style={styles.eventtitle}>Time:</Text>
              <Text style={styles.eventdescription}> {event.time}</Text>
            </View>

            <View style={styles.ticketcontainer}>
              <Text style={{ color: "grey", fontWeight: "bold", fontSize: 14 }}>
                Tickets :{" "}
              </Text>
              <View style={styles.soldticket}>
                <Text style={styles.soldtickettext} numberOfLines={1}>
                  {event.soldTickets} sold
                </Text>
              </View>
              <View style={styles.alltickets}>
                <Text style={styles.alltickettext} numberOfLines={1}>
                  {event.ticketCount} available
                </Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", gap: 15, marginLeft: width * 0.1 }}
            >
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => updateevent(event)}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.DeleteButton}
                onPress={() => deleteevent(event)}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213E",
    borderRadius: width * 0.08,
  },

  imageContainer: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: width * 0.7,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  eventheader: {
    fontFamily: "DMMedium",
    fontSize: 26,
    letterSpacing: 3,
    color: "white",
    fontWeight: "bold",
  },
  titlecontainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  eventdetails: {
    fontSize: 16,
    fontFamily: "DMRegular",

    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  eventtitle: {
    fontSize: 15,
    fontFamily: "DMBold",
    letterSpacing: 1,
    textShadowColor: "white",
    color: "grey",
    fontWeight: "bold",
  },
  eventdetailscontainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: width * 0.08,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: height * 0.05,
    flex: 1,
  },
  eventdescription: {
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ticketcontainer: {
    flexDirection: "row",
    gap: width * 0.06,
    alignContent: "center",
    alignItems: "center",
    marginLeft: width * 0.005,
    marginTop: height * 0.05,
    marginBottom: 10,
  },
  alltickettext: {
    fontSize: 16,
    color: "grey",
    shadowColor: "#000",
    fontFamily: "DMMedium",
    textShadowColor: "black",
    marginLeft: width * 0.02,
    marginRight: width * 0.005,
    marginTop: height * 0.01,
    fontWeight: "bold",
  },

  soldtickettext: {
    fontSize: 16,
    color: "darkred",
    shadowColor: "#000",
    fontFamily: "DMMedium",
    textShadowColor: "black",
    marginLeft: width * 0.02,
    marginRight: width * 0.005,
    marginTop: height * 0.01,
    fontWeight: "bold",
  },
  soldticket: {
    width: width * 0.22,
    height: width * 0.08,
    borderRadius: width * 0.5,
  },

  alltickets: {
    width: width * 0.32,
    height: height * 0.04,
    borderRadius: width * 0.2,
  },
  updateButton: {
    backgroundColor: "rgba(254, 254, 250, 0.8)",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: width * 0.3,
    marginTop: height * 0.05,
    elevation: 4
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  updateButtonText: {
    color: "76, 175, 80",
    fontSize: 15,
    fontWeight: "bold",
  },
  DeleteButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "DMMedium",
  },
  DeleteButton: {
    backgroundColor: "rgba(155, 0, 0, 0.8)", 
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: width * 0.3,
    marginTop: height * 0.05,
    elevation: 4,
  },
});
