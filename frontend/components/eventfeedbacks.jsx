import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import UserFeedbackCard from "./userFeedbackCard";
const FeedbackModal = ({ visible, onClose, eventid }) => {
  const [feedbackdata, setfeedbackdata] = useState([]);

  const geteventFeedbacks = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`/feedback/for-event/${eventid}`, apiConfig)
      .then((response) => {
        setfeedbackdata(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    geteventFeedbacks();
  }, [eventid]);

  const renderItem = ({ item }) => (
    <View style={styles.feedbackCardContainer}>
      <UserFeedbackCard item={item} />
    </View>
  );
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Feedbacks</Text>
        <FlatList
          data={feedbackdata}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
        />

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FeedbackModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackCardContainer: {
    marginBottom: 10,
  },
});
