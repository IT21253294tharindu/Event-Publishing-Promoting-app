import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

const UpdateEvent = ({ route }) => {
  const { eventId } = route.params;
  console.log(eventId);

  const navigation = useNavigation();
  const [event, setEvent] = useState({
    eventName: "",
    eventType: "",
    location: "",
    time: "",
    date: "",
    expectedCrowd: "",
    expectedBudget: "",
    ticketCount: "",
    description: "",
    images: [],
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPicker, setshowPicker] = useState(false);

  //const [eventName, setEventName] = useState(eventToUpdate.eventName);
  // const [eventType, setEventType] = useState(eventToUpdate.eventType);
  //  const [location, setLocation] = useState(eventToUpdate.location);
  //  const [time, setTime] = useState(eventToUpdate.time);
  //  const [date, setDate] = useState(eventToUpdate.date);
  //  const [expectedCrowd, setExpectedCrowd] = useState(eventToUpdate.expectedCrowd);
  //   const [expectedBudget, setExpectedBudget] = useState(eventToUpdate.expectedBudget);
  // const [ticketcount, setticketcount] = useState(eventToUpdate.ticketcount);
  //   const [eventdescription, seteventdescription] = useState(eventToUpdate.description);
  // const [images, setImages] = useState(Array.isArray(eventToUpdate.images) ? eventToUpdate.images : []);
  const [image, setImage] = useState([]);

  const getEventdetails = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`/event/${eventId}`, apiConfig)
      .then((response) => {
        setEvent(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getEventdetails();
  }, [eventId]);

  const handleUpdate = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`/event/update/` + eventId, event, apiConfig)
      .then((response) => {
        console.log("Event updated successfully");
        // You can navigate back to the event details screen or any other screen
        navigation.navigate("organizerhome", { event: response.data });
      })
      .catch((error) => {
        console.error(error);
        // Handle update errors here
      });
  };

  if (!event) {
    // If event is null, display a loading indicator or message
    return (
      <View>
        <Text>Loading event details...</Text>
      </View>
    );
  }

  const renderExistingImages = () => {
    return event.images.map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        {typeof image === "string" ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.selectedImage}
          />
        ) : (
          <Image source={{ uri: image.uri }} style={styles.selectedImage} />
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteImage(index)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    ));
  };
  const deleteImage = (index) => {
    const updatedImages = [...event.images];
    updatedImages.splice(index, 1);
    setEvent({ ...event, images: updatedImages });
  };

  const pickImage = async () => {
    if (event.images.length >= 3) {
      // Limit the number of images to 3
      alert("You can only upload up to 3 images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      

      const newImages = [...event.images, result.assets[0].uri];
      // Convert the image to base64
      const base64Image = await imageToBase64(result.assets[0].uri);

      if (base64Image) {
        const newImages = [...event.images, base64Image];
        setEvent({ ...event, images: newImages });
      }
      else {
        alert("Failed to convert image to base64.");
      }

    } else {
      setImage(null);
    }
  }; 
  
  const imageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64String = await blobToBase64(blob);
      return base64String;
    } catch (error) {
      console.error("Image to base64 conversion error:", error);
      return null;
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract the base64-encoded part
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formtitlecontainer}>
          <Text style={styles.formtitle}>Update Event</Text>
        </View>

        <View style={styles.formstyle}>
          <View style={styles.formstyleinner}>
            <Text style={styles.label}>Event Name:</Text>
            <TextInput
              style={styles.input}
              value={event.eventName}
              placeholder="enter event name"
              onChangeText={(text) => setEvent({ ...event, eventName: text })}
            />

            <Text style={styles.label}>Event Type:</Text>
            <Picker
              selectedValue={event.eventType}
              onValueChange={(itemValue) =>
                setEvent({ ...event, eventType: itemValue })
              }
              style={styles.picker}
            >
              <Picker.Item label="Concert" value="Concert" />
              <Picker.Item label="Conference" value="Conference" />
              <Picker.Item label="Exhibition" value="Exhibition" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <View>
              <Text style={styles.label}>Images:</Text>
              <TouchableOpacity
                style={{ width: width * 0.5, marginBottom: 10 }}
                onPress={pickImage}
              >
                <Text>ADD IMAGE</Text>
              </TouchableOpacity>
              <View style={styles.selectedImageContainer}>
                {renderExistingImages()}
              </View>
            </View>

           {/* <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              value={event.location}
              placeholder="enter event location"
              onChangeText={(text) => setEvent({ ...event, location: text })}
            />*/}

            {showTimePicker && (
              <DateTimePicker
                style={{ width: 200 }}
                mode="time"
                is24Hour={true}
                placeholder="Select Time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                value={new Date()}
                onChange={(even, selectedtime) => {
                  setShowTimePicker(false);
                  if (even.type === "set") {
                    const formattedTime =
                      selectedtime instanceof Date
                        ? selectedtime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "";
                    setEvent({ ...event, time: formattedTime });
                  }
                }}
              />
            )}
            <Text style={styles.label}>Time:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.input}>{event.time}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                style={{ width: 200 }}
                mode="date"
                placeholder="Select Date"
                format="YYYY-MM-DD"
                minDate="2023-01-01"
                maxDate="2025-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                value={new Date()}
                onChange={(even, selectedDate) => {
                  setshowPicker(false);
                  if (even.type === "set") {
                    const formattedDate = selectedDate
                      .toISOString()
                      .split("T")[0];
                    setEvent({ ...event, date: formattedDate });
                  }
                }}
              />
            )}

            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={() => setshowPicker(true)}>
              <Text style={styles.input}>
                {event.date} {/* Display the selected date */}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Expected Crowd:</Text>
            <TextInput
              style={styles.input}
              value={String(event.expectedCrowd)}
              placeholder="enter expected crowd"
              onChangeText={(text) =>
                setEvent({ ...event, expectedCrowd: text })
              }
            />

            <Text style={styles.label}>Expected Budget:</Text>
            <TextInput
              style={styles.input}
              value={String(event.expectedBudget)}
              placeholder="enter expected budget"
              onChangeText={(text) =>
                setEvent({ ...event, expectedBudget: text })
              }
            />

            <Text style={styles.label}>Tickets Count:</Text>
            <TextInput
              style={styles.input}
              value={String(event.ticketCount)}
              placeholder="enter the ticket count"
              onChangeText={(text) => setEvent({ ...event, ticketCount: text })}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.eventdescription}
              value={event.description}
              placeholder="enter event description"
              onChangeText={(text) => setEvent({ ...event, description: text })}
              multiline={true}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdate}
            >
              <Text style={styles.submitButtonText}>Update Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#16213E",
    borderRadius: width * 0.08,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: "grey",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  eventdescription: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 40,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: width * 0.5,
  },
  submitButton: {
    backgroundColor: "#16213E",
    marginTop: height * 0.02,
    padding: 15,
    borderRadius: width * 0.5,
    alignItems: "center",
    width: width * 0.5,
    marginLeft: width * 0.2,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  formtitle: {
    fontFamily: "DMMedium",
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 3,
    color: "white",
  },
  formtitlecontainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: height * 0.1,
    marginBottom: height * 0.1,
  },
  formstyle: {
    backgroundColor: "#ffffff",
    borderRadius: width * 0.1,
    width: "100%",
  },
  formstyleinner: {
    marginTop: height * 0.05,
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    marginBottom: height * 0.05,
  },
  selectedImageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    marginTop: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default UpdateEvent;
