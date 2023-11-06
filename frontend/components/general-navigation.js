import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Home from "../screens/home";
import AllEvents from "../screens/allEvents";
import FeedbackOrg from "../screens/feedbackOrg";
import AnalyticsOrg from "../screens/analyticsOrg";
import SponsorDash from "../screens/sponsorDash";
import ReqSponsor from "../screens/reqSponsor";
import PublishAllSponsors from "../screens/publishAllSponsors";
import { Ionicons } from "@expo/vector-icons";
import ProfIcon from "../assets/images/user.png";
import { COLORS } from "../constraints/constants";
import OrganizerHome from "../screens/organizerhome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function GeneralNavigation() {
  const Drawer = createDrawerNavigator();
  const [AuthToken, setAuthToken] = useState("");
  const [AccType, setAccType] = useState("");

  useEffect(() => {
    getAsyncValues();
    console.log(AccType);
  }, []);

  async function getAsyncValues() {
    const AuthToken = await AsyncStorage.getItem("token");
    await setAuthToken(AuthToken);
    const AccType = await AsyncStorage.getItem("accType");
    await setAccType(AccType);
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={ProfIcon}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text>Hash</Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.primary,
          width: 250,
        },

        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveBackgroundColor: COLORS.co_primary,
        drawerLabelStyle: {
          color: COLORS.white,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={COLORS.white} />
          ),
        }}
        component={Home}
      />

      {AccType == "Organizer" && (
        <Drawer.Screen
          name="Organizerhome"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
          component={OrganizerHome}
        />
      )}

      <Drawer.Screen
        name="All Events"
        options={{
          drawerLabel: "Events",
          title: "Events",
        }}
        component={AllEvents}
      />
      {AccType == "Sponsor" && (
        <Drawer.Screen
          name="Sponsor Dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Sponsor Dashboard",
          }}
          component={SponsorDash}
        />
      )}

      <Drawer.Screen
        name="All Feedbacks"
        options={{
          drawerLabel: "Feedbacks",
          title: "Feedbacks",
        }}
        component={FeedbackOrg}
      />
      {AccType == "Organizer" && (
        <Drawer.Screen
          name="Analytics"
          options={{
            drawerLabel: "Analytics",
            title: "Analytics",
          }}
          component={AnalyticsOrg}
        />
      )}
      {AccType == "Organizer" && (
        <Drawer.Screen
          name="Request Sponsor"
          options={{
            drawerLabel: "Request Sponsor",
            title: "Request Sponsor",
          }}
          component={ReqSponsor}
        />
      )}

      <Drawer.Screen
        name="Publish All Sponsors "
        options={{
          drawerLabel: "Sponsorships",
          title: "Sponsorships",
        }}
        component={PublishAllSponsors}
      />
    </Drawer.Navigator>
  );
}
