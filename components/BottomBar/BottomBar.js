import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../Map/Map";
import {
  Feather,
  MaterialIcons,
  Ionicons,
  AntDesign,
  EvilIcons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import UserFeed from "../UserFeed/UserFeed";
import Profile from "../Profile/Profile";
import SOS from "../SOS/SOS";
import SafetyAnalysis from "../SafetyAnalysis/SafetyAnalysis";
import { s, vs } from "react-native-size-matters";

const BottomBar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Map"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      tabBarStyle={{
        paddingBottom: vs(48),
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Map") {
            iconComponent = (
              <Ionicons
                name="location"
                size={27}
                color={focused ? "#6619c7" : "grey"}
              />
            );
          } else if (route.name === "UserFeed") {
            iconComponent = (
              <FontAwesome
                name="feed"
                size={27}
                color={focused ? "#6619c7" : "grey"}
              />
            );
          } else if (route.name === "SOS") {
            iconComponent = (
              <MaterialIcons
                name="warning"
                size={27}
                color={focused ? "#6619c7" : "grey"}
              />
            );
          } else if (route.name === "Profile") {
            iconComponent = (
              <Ionicons
                name="md-person"
                size={27}
                color={focused ? "#6619c7" : "grey"}
              />
            );
          } else if (route.name === "SafetyAnalysis") {
            iconComponent = (
              <Ionicons
                name="analytics"
                size={29}
                color={focused ? "#6619c7" : "grey"}
              />
            );
          }

          // Return the assigned icon component
          return iconComponent;
        },
      })}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarStyle: styles.tabBarStyle,
        }}
      />

      <Tab.Screen
        name="UserFeed"
        component={UserFeed}
        options={{
          tabBarStyle: styles.tabBarStyle,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOS}
        options={{
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="SafetyAnalysis"
        component={SafetyAnalysis}
        options={{
          tabBarStyle: styles.tabBarStyle,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: styles.tabBarStyle,
          tabBarBadge: 1,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabBarStyle: {
    padding: s(20),
    borderRadius: 20,
    height: vs(60),
    position: "absolute",
    bottom: 28,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 15,
  },
});
