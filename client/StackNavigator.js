import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home/HomeScreen";
import HistoryScreen from "./screens/History/HistoryScreen";
import StudyScreen from "./screens/Study/StudyScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SignIn from "./screens/SignIn/SignIn";
import MainScreen from "./screens/MainScreen/MainScreen";
import SignUp from "./screens/SignUp/SignUp";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainScreen" component={MainScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Study" component={StudyScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
