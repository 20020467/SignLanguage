import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { React } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import HistoryTab from "./HistoryTab";
import SaveTab from "./SaveTab";
import SafeAreaView from "react-native-safe-area-context"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignContent: "stretch",
    paddingTop: 1,
    height: "5%",
  },
  navigateButton: {
    flex: 1,
    backgroundColor: "white",
    // borderBottomColor: "black",
    borderBottom: "2px solid black",
    borderStyle: "dashed",
  },
  navigateText: {
    textAlign: "center",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconSize: 22,
});


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
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="HistoryTab"
          component={HistoryTab}
          options={{
            tabBarLabel: "Lịch sử",
          }}
        // style={ styles.navigateButton }
        />
        <Tab.Screen
          name="SaveTab"
          component={SaveTab}
          options={{
            tabBarLabel: "Đã Lưu",
            tabBarIcon: () => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="home"
                  size={styles.iconSize}
                  style={{
                  }}
                />
                {/* <Text
                  style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
                >
                  Đã lưu
                </Text> */}
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
