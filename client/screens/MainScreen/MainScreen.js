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
        tabBarStyle: styles.bottomTabBar
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={styles.bottomtabBarButton}
            >
              <Icon
                style={[styles.bottomTabBarIcon, { color: highlight(focused) }]}
                name="home"
                size={iconSize}
              />
              <Text
                style={[styles.bottomTabBarLabel, { color: highlight(focused) }]}
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
              style={styles.bottomtabBarButton}
            >
              <Icon
                style={[styles.bottomTabBarIcon, { color: highlight(focused) }]}
                name="menu-book"
                size={iconSize}
              />
              <Text
                style={[styles.bottomTabBarLabel, { color: highlight(focused) }]}
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
              style={styles.bottomtabBarButton}
            >
              <Icon
                style={[styles.bottomTabBarIcon, { color: highlight(focused) }]}
                name="star-outline"
                size={iconSize}
              />
              <Text
                style={[styles.bottomTabBarLabel, { color: highlight(focused) }]}
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
  bottomTabBar: {
    height: '7%',
  },
  bottomtabBarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTabBarIcon: {
    width: 25,
    height: 25,
  },
  bottomTabBarLabel: {
    fontSize: 12,
  }
})

function highlight(focused) {
  return focused ? "#e32f45" : "#748c94"
}

export default MainScreen;
