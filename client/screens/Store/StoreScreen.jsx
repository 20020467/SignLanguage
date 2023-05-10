import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryTab from "./HistoryTab";
import SaveTab from "./SaveTab";
import { SECONDARY_1, SECONDARY_2, StoreScreenStyles as styles } from "../styles";

const Tab = createMaterialTopTabNavigator()

const StoreContext = createContext()

/**
 * The main screen, contains History & Saved (records) Tabs
 */
const StoreScreen = ({ navigation }) => {
  // set true only if switching from other screens to this
  const [focused, setFocused] = useState(false)
  // may create another context (or use this context instead) wrapping the main navigator, 
  // then pass its value to this var.
  // This state var is changed when there're data changes from other tabs.
  const [dataChanged, setDataChanged] = useState(false)

  const insets = useSafeAreaInsets() // may apply to the main screen in near future update

  useEffect(() => {
    const unsub = navigation.addListener('focus', (e) => {
      // console.log(e)
      setFocused(true)
    })

    return unsub
  }, [navigation])

  const contextValue = {
    focused, setFocused, dataChanged, setDataChanged
  }

  return (
    <StoreContext.Provider value={contextValue}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Tab.Navigator
          initialRouteName="HistoryTab"
          screenOptions={{
            tabBarActiveTintColor: SECONDARY_1,
            tabBarInactiveTintColor: SECONDARY_2,
            tabBarLabelStyle: styles.topTabBarLabel,
            tabBarStyle: styles.topTabBar,
            swipeEnabled: false,
          }}
        // backBehavior="none"
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
                    size={styles.topTabBarButton.iconSize}
                    style={{ color: highlight(focused) }}
                  />
                </View>
              )
            }}
          // initialParams={{ context: StoreContext }}
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
                    size={styles.topTabBarButton.iconSize}
                    style={{ color: highlight(focused) }}
                  />
                </View>
              ),
            }}
          // initialParams={{ context: StoreContext }}
          />
        </Tab.Navigator>
      </View>
    </StoreContext.Provider>
  )
}

StoreScreen.propTypes = {

}

export default StoreScreen
export { StoreContext }

function highlight(focused) {
  return focused ? SECONDARY_1 : SECONDARY_2
}
