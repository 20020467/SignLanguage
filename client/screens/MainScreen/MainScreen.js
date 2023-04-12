import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../Home/HomeScreen";
import StoreScreen from "../Store/StoreScreen";
import StudyScreen from "../Study/StudyScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const iconSize = 28;

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
                  color: focused ? "#e32f45" : "#748c94",
                }}
                name="home"
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
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
                  color: focused ? "#e32f45" : "#748c94",
                }}
                name="menu-book"
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
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
        name="StoreTab"
        component={StoreScreen}
        options={{
          title: "History",
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
                  color: focused ? "#e32f45" : "#748c94",
                }}
                name="star-outline"
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
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
