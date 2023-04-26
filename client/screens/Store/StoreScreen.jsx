import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
import HistoryTab from "./HistoryTab";
import SaveTab from "./SaveTab";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialTopTabNavigator()

/**
 * History & saved item list screen
 */
const StoreScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/* <Header /> */}
      <Tab.Navigator
        initialRouteName="HistoryTab"
        screenOptions={{
          //highlight label
          tabBarActiveTintColor: '#e32f02',
          tabBarInactiveTintColor: '#748c94',
          tabBarLabelStyle: styles.topTabBarLabel,
          tabBarAccessibilityLabel: 'abc',
          tabBarStyle: styles.topTabBar,
        }}
        backBehavior="none"
      >
        <Tab.Screen
          name="HistoryTab"
          component={HistoryTab}
          options={{
            tabBarLabel: "Lịch sử",
            tabBarIcon: ({ focused, color }) => (
              <View
                style={styles.topTabBarButton}
              >
                <Icon
                  name="clock"
                  size={styles.iconSize}
                  style={{ color: highlight(focused) }} // highlight icon
                />
              </View>
            )
          }}
        // style={ styles.navigateButton }
        />
        <Tab.Screen
          name="SaveTab"
          component={SaveTab}
          options={{
            tabBarLabel: "Đã Lưu",
            tabBarIcon: ({ focused, color }) => (
              <View
                style={styles.topTabBarButton}
              >
                <Icon
                  name="content-save"
                  size={styles.iconSize}
                  style={{ color: highlight(focused) }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

StoreScreen.propTypes = {

}

export default StoreScreen

const styles = StyleSheet.create({
  topTabBar: {
    backgroundColor: 'rgb(160, 140, 120)',
    height: '9%',
  },
  topTabBarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  topTabBarLabel: {
    fontSize: 12,
  },
  iconSize: 22,
  // unused
})

function highlight(focused) {
  return focused ? "#e32f02" : "#748c94"
}
