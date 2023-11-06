import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Maps() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 6.799414,
    longitude: 79.8731939,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [nearLocations, setNearLocations] = useState([]);

  const [eventLocation, setEventLocation] = useState([]);

  const getUserLocation = async () => {
    console.log(
      "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
    );
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission Denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    console.log(location);

    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
  };

  const getAllEvents = async () => {
    const AuthToken = await AsyncStorage.getItem("token");

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("/event/all", apiConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getNearLocations = (latitude1, longitude1, latitude2, longitude2) => {
    const radius = 6371;

    const lat1 = (latitude1 * Math.PI) / 180;
    const lat2 = (latitude2 * Math.PI) / 180;
    const lon1 = (longitude1 * Math.PI) / 180;
    const lon2 = (longitude2 * Math.PI) / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
  };

  const filterLocations = () => {
    const newNearLocations = [];

    eventLocation.forEach((event) => {
      const distance = getNearLocations(
        currentLocation.latitude,
        currentLocation.longitude,
        event.location.lattitude,
        event.location.longitude
      );

      if (distance < 10) {
        newNearLocations.push(event);
      }
    });

    setEventLocation(newNearLocations);
    setNearLocations(newNearLocations);
  };

  useEffect(() => {
    getUserLocation();
    getAllEvents();
  }, []);

  return (
    <View>
      <MapView style={styles.map} initialRegion={currentLocation}>
        <Marker
          coordinate={currentLocation}
          image={require("../assets/images/map_marker.png")}
          title="My Location"
          description="This is where you are"
        ></Marker>
        {eventLocation.map((event, index = 0) => (
          <Marker key={index} coordinate={event.location}>
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>{event.eventName}</Text>

                  <Text style={styles.name2}>
                    <Text>{event.eventType}</Text>
                    {/* <Image style={styles.image} source={{ uri: event.image }} /> */}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* <Button title="Get Location" onPress={getUserLocation} /> */}
      <Button title="Filter Events" onPress={filterLocations} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "90%",
  },
  //callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  //charachter Name
  name: {
    fontSize: 16,
  },
  name2: {
    marginBottom: 5,
    paddingBottom: 5,
  },
  //charachter image
  image: {
    width: 120,
    height: 120,
  },
});
