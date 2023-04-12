import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Star from "react-native-vector-icons/Entypo";
import NoStar from "react-native-vector-icons/EvilIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Home/HomeScreen";
import StudyScreen from "../Study/StudyScreen";
import HistoryScreen from "../History/HistoryScreen";

const Tab = createBottomTabNavigator();
const MainScreen = () => {
  const iconSize = 28;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#02B0F0" : "#748c94",
                }}
                name="home"
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#02B0F0" : "#748c94",
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StudyTab"
        component={StudyScreen}
        options={{
          title: "Study",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                style={{
                  width: 25,
                  height: 25,
                  color: focused ? "#02B0F0" : "#748c94",
                }}
                name="menu-book"
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#02B0F0" : "#748c94",
                  fontSize: 12,
                }}
              >
                Study
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreen}
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <Star
                  style={{
                    width: 25,
                    height: 25,
                    color: "#02B0F0",
                  }}
                  name="star"
                  size={26}
                />
              ) : (
                <NoStar
                  style={{
                    width: 25,
                    height: 25,
                    color: "#748c94",
                  }}
                  name="star"
                  size={iconSize}
                />
              )}

              <Text
                style={{
                  color: focused ? "#02B0F0" : "#748c94",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                History
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  background: {
    // backgroundColor: "#0F0F29",
    // width: "100%",
    // height: "100%",
  },
});
export default MainScreen;
