import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider } from "./context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoRegular": require("./assets/fonts/Roboto-Regular.ttf"),
    "RobotoBold": require("./assets/fonts/Roboto-Bold.ttf"),
    "RobotoItalic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Poppins-Regular": require("./assets/fonts/PoppinsRegular400.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </AppContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
