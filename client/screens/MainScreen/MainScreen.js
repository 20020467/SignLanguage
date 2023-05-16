import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Star from "react-native-vector-icons/Entypo";
import NoStar from "react-native-vector-icons/EvilIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
          title: "Trang chủ",
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
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StudyTab"
        component={StudyScreen}
        options={{
          title: "Học tập",
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
                Học tập
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StoreTab"
        component={StoreScreen}
        options={{
          title: "Lịch sử",
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
                Lịch sử
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
