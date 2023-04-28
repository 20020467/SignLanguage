import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryTab from "./HistoryTab";
import SaveTab from "./SaveTab";
import { SECONDARY_1, SECONDARY_2, StoreScreenStyles as styles } from "./style";

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
          tabBarActiveTintColor: SECONDARY_1,
          tabBarInactiveTintColor: SECONDARY_2,
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

function highlight(focused) {
  return focused ? SECONDARY_1 : SECONDARY_2
}
