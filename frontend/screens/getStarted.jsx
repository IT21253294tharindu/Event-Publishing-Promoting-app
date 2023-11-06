import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../assets/images/EventGoSplash.png")}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleGetStarted}>
          <Text style={styles.loginButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default GetStarted;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 1.2,
    height: height * 0.75,
    resizeMode: "contain",
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#16213E",
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: width * 0.65,
    marginTop: height * 0.05,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
