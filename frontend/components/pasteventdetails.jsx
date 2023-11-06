import { React, useState } from "react";
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
import { SegmentedButtons } from "react-native-paper";
import Mypastevents from "./eventhistory";
import FeedCard from "./feedCard";
import FeedbackModal from "./eventfeedbacks";
import EventAnalytics from "./eventanalytics";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const PastEventDetails = ({ route }) => {
  const [value, setValue] = useState("");
  const navigation = useNavigation();

  const { pastevent } = route.params;
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item}` }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
  const openFeedbackModal = () => {
    setFeedbackModalVisible(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollViewContent}>
        <View>
          <FlatList
            data={pastevent.images}
            renderItem={renderItem}
            horizontal
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
                <Text style={styles.eventdetails}> {pastevent.date}</Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", gap: 6, marginTop: height * 0.02 }}
            >
              <Text style={styles.eventtitle}>Event Name:</Text>
              <Text style={styles.eventdetails}> {pastevent.eventName}</Text>
            </View>

            <View
              style={{ flexDirection: "row", gap: 6, marginTop: height * 0.02 }}
            ></View>
            <View style={{ gap: 10, marginTop: height * 0.05 }}>
              <Text style={styles.eventtitle}>Event Description:</Text>
              <Text style={styles.eventdescription}>
                {" "}
                {pastevent.description}
              </Text>
            </View>
            <View style={{ gap: 10, marginTop: height * 0.05 }}>
              <Text style={styles.eventtitle}>Time:</Text>
              <Text style={styles.eventdescription}> {pastevent.time}</Text>
            </View>

            <View style={styles.ticketcontainer}>
              <Text style={{ color: "grey", fontWeight: "bold", fontSize: 14 }}>
                Tickets :{" "}
              </Text>
              <View style={styles.soldticket}>
                <Text style={styles.soldtickettext} numberOfLines={1}>
                  {pastevent.soldTickets} sold
                </Text>
              </View>
              <View style={styles.alltickets}>
                <Text style={styles.alltickettext} numberOfLines={1}>
                  {pastevent.ticketCount} available
                </Text>
              </View>
            </View>

            <View style={styles.segment}>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: "Feedbacks",
                    label: "Feedbacks",
                    onPress: openFeedbackModal,
                  },
                  {
                    value: "eventanalytics",
                    label: "Event Analytics",
                  },
                ]}
              />
            </View>
          </View>

          {value === "eventanalytics" && (
            <EventAnalytics eventinfo={pastevent} />
          )}
          <FeedbackModal
            visible={feedbackModalVisible}
            onClose={closeFeedbackModal}
            eventid={pastevent._id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PastEventDetails;

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
    backgroundColor: "#125225",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: width * 0.3,
    marginTop: height * 0.05,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  updateButtonText: {
    color: "#fff",
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
    backgroundColor: "darkred",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: width * 0.3,
    marginTop: height * 0.05,
  },
});
