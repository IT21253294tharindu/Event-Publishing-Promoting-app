import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { COLORS } from "./constraints/constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralNavigation from "./components/general-navigation";
import Login from "./screens/login";
import SignUp from "./screens/signUp";
import GetStarted from "./screens/getStarted";
import GeneralEventDetails from "./screens/generalEventDetails";
import OrganizerHome from "./screens/organizerhome";
import { useFonts } from "expo-font";
import EventDetails from "./components/myeventdetails";
import AllEventDetails from "./screens/allEventDetails";
import SponsorDetailView from "./components/sponsorDetailView";
import PublishSponsorship from "./screens/publishSposorShip";
import PastEventDetails from "./components/pasteventdetails";
import EventForm from "./components/createevent";
import UpdateEvent from "./components/updateevent";
import axios from "axios";
const Stack = createStackNavigator();

axios.defaults.baseURL = "http://192.168.8.198:3001";

export default function App() {
  const [fontloaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontloaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GetStarted">
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GeneralNavigation"
            component={GeneralNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GeneralEventDetails"
            component={GeneralEventDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="organizerhome"
            component={OrganizerHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PastEventDetails"
            component={PastEventDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EventForm"
            component={EventForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateEvent"
            component={UpdateEvent}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AllEventDetails"
            component={AllEventDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PublishSponsorship"
            component={PublishSponsorship}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SponsorDetailView"
            component={SponsorDetailView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
