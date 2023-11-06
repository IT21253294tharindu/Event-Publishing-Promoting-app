import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
import { Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import ReqSponsorCard from "../components/reqSponsorCard";
const ReqSponsor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsorData, setSponsorData] = useState([
    {
      id: "1",
      sponsorName: "P&s",
      expectedCroud: 2500,
      companyImage: require("../assets/images/sampleCompany.png"),
    },
    {
      id: "2",
      sponsorName: "Pizza Hut",
      expectedCroud: 5500,
      companyImage: require("../assets/images/sampleCompany.png"),
    },
    {
      id: "3",
      sponsorName: "KFC",
      expectedCroud: 8500,
      companyImage: require("../assets/images/sampleCompany.png"),
    },
    {
      id: "4",
      sponsorName: "Coca cola",
      expectedCroud: 9500,
      companyImage: require("../assets/images/sampleCompany.png"),
    },
  ]);
  const [filteredData, setFilteredData] = useState(sponsorData);

  const handleSearch = () => {
    const filtered = sponsorData.filter((item) =>
      item.sponsorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (item) => {
    setModalVisible(true);
  };
  const [showDropDown, setShowDropDown] = useState(false);
  const [events, setEvents] = useState("");

  const eventTypes = [
    {
      label: "Event 1",
      value: "Event 1",
    },
    {
      label: "Event 2",
      value: "Event 2",
    },
    {
      label: "Event 3",
      value: "Event 3",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              placeholder="Search for Sponsors"
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
        <View style={styles.flatListContent}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ReqSponsorCard item={item} handleCardPress={handleCardPress} />
            )}
          />
        </View>

        {/* modal content */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Provider>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Send Request</Text>
                <DropDown
                  label={"Select Event"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={events}
                  setValue={setEvents}
                  list={eventTypes}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Provider>
        </Modal>
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
  flatListContent: {
    top: height * 0.02,
    flex: 1,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#16213E",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 5,
    top: height * 0.01,
  },
  submitButtonText: {
    color: "white",
  },
  closeButton: {
    backgroundColor: "rgb(260,120,76)",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    top: height * 0.01,
  },
  closeButtonText: {
    color: "white",
  },
});

export default ReqSponsor;
